'use strict';

angular.module('gamejamApp')
    .config(function($stateProvider) {
    	$stateProvider
    		.state('level.play', {
    			url: '/play',
    			controller: 'TheGame',
    			templateUrl: 'views/game/play.html'
    		})
    });

angular.module('gamejamApp')
  .controller('TheGame', function ($scope, $state, Program, levelService, GameService) {
    console.log($scope.level.defaultCode);
    $scope.program = new Program($scope.level.defaultCode);
    $scope.program.compile();

    $scope.errorMessage = "";

    $scope.availableBlocks = levelService.getBlocks($scope.level);

    $scope.$watch('program.processor.crashed', function(crashed){
        $scope.errorMessage = crashed;
    });

    $scope.resetGame = function(){
        GameService.resetGameFromLastMap();
    };

    $scope.addToProgram = function(blockType){

        if(!$scope.program.statements){
            $scope.program.init();
        }
        var programStmt = $scope.program.statements;
        var block = new blockType.constructor();
        block.init(blockType.cfg.src, programStmt);

        programStmt.addStatement(block);
    };

    $scope.$on('win', function() {
        $state.go('^.wrapup');
    });


    $scope.convertToCode = function(){
        console.log($scope.program.statements.children);
        var stmt = $scope.program.statements.children[0];
        var src = '';
        while (stmt) {
            delete stmt.source;
            src += stmt.getSource() + '\n';
            stmt = stmt.nextStatement(true);
        }
        $scope.program.code = src;
    }

    $scope.blockEditing = true;
    $scope.switchCodingContext= function(){
        $scope.blockEditing = !$scope.blockEditing;
    };

    $scope.runProgram = function(){
        GameService.resetGameFromLastMap();
        $scope.convertToCode();
        $scope.program.compile();
        $scope.program.run();
    };

    
    
  });
