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

  .controller('TheGame', function ($scope, $state, Program, levelService, GameService, blockService) {

    
    var func = new FunctionCall();
    func.name = "Step";
    func.parameters = [];

    var func2 = new FunctionCall();
    func2.name = "TurnRight";
    func2.parameters = [];

    var func3 = new FunctionCall();
    func3.name = "TurnLeft";
    func3.parameters = [];

    
    console.log($scope.program);

    console.log($scope.level.defaultCode);
    $scope.program = new Program("Step()\n", null);


    $scope.program.compile();

    

    console.log($scope.program);

    $scope.errorMessage = "";

    $scope.availableBlocks = levelService.getBlocks($scope.level);

    $scope.$watch('program.processor.crashed', function(crashed){
        $scope.errorMessage = crashed;
        if (crashed) {
            $scope.program.processor.io.interrupt('Talk', [ 'Ayeeeeeeeeeeeeeeee!' ]);
        }
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
    $scope.switchCodingContext = function(){
        $scope.program.compile();
        $scope.blockEditing = !$scope.blockEditing;
    };

    $scope.runProgram = function(){
        GameService.resetGameFromLastMap();
        if (!$scope.blockEditing) {
            $scope.program.compile();
        }
        $scope.program.run();
    };

    $scope.isBlockHidden = blockService.dontShow;
    
  });
