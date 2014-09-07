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
    $scope.program = new Program();
    $scope.isMusicOn = true;

    $scope.errorMessage = "";

    $scope.availableBlocks = levelService.getBlocks($scope.level);

    $scope.$watch('program.processor.crashed', function(crashed){
        $scope.errorMessage = crashed;
    });

    $scope.toggleMusic = function() {
        $scope.isMusicOn = !$scope.isMusicOn;
        if ($scope.isMusicOn) {
            $('#music')[0].play();
        } else {
            $('#music')[0].pause();
        }
    };

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
        $scope.convertToCode();
        $scope.program.compile();
        $scope.program.run();
    };

    
    
  });
