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
    (typeof $scope.level.defaultCode != undefined) ? $scope.program = new Program($scope.level.defaultCode) : $scope.program = new Program();


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

    $scope.resetGame = function() {
        GameService.resetGameFromLastMap();
    };

    $scope.addToProgram = function(blockType){

        if(!$scope.program.statements){
            $scope.program.init();
        }
        var programStmt = $scope.program.statements;
        var block = new blockType.constructor();

        block.init(blockType.cfg.src, programStmt);

        var insertAfter = null;
        for(var i=programStmt.children.length-1; i >=0; i--){
            insertAfter = programStmt.children[i];
            if(!insertAfter.endsBlock){
                break;
            }
        }

        programStmt.addStatement(block, insertAfter);
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
    };

    $scope.blockEditing = true;
    $scope.switchCodingContext = function(){
        if($scope.blockEditing){
            $scope.convertToCode();
        }
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


    var currentBlock;
    $scope.currentBlock = function(){
        if(!$scope.program.isRunning() && !currentBlock){
            return $scope.program.statements.nextStatement(true);
        }
        return currentBlock;
    };
    $scope.$watch('program.processor.nextStatement', function(val){
        if(val && !blockService.dontShow(val) && val.program === $scope.program.statements){
            currentBlock = val;
            console.log(val);
        }
    });

    $scope.isBlockHidden = blockService.dontShow;
    
  });
