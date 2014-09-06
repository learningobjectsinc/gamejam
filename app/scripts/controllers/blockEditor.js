"use strict";

angular.module('gamejamApp').controller('BlockEditor', function($scope, Block, blockService){

	$scope.program = [];

	$scope.addToProgram = function(archtype){
		var block = new Block(archtype);
		$scope.program.push(block);
	};

	$scope.blockTypes = blockService.getBlocks();

});