"use strict";

angular.module('gamejamApp').controller('BlockEditor', function($scope, Block, Program, blockService, GameService){

	$scope.blockProgram = [];

	$scope.addToProgram = function(archtype){
		var block = new Block(archtype);
		$scope.blockProgram.push(block);
	};

	$scope.blockTypes = blockService.getBlocks();

});