"use strict";

angular.module('gamejamApp').controller('BlockEditor', function($scope, Block, Program, blockService){

	$scope.blockProgram = [];
	$scope.isSoundOn = true;

	$scope.addToProgram = function(archtype){
		var block = new Block(archtype);
		$scope.blockProgram.push(block);
	};

	$scope.blockTypes = blockService.getBlocks();

	$scope.toggleSound = function() {
		$scope.isSoundOn = !$scope.isSoundOn;
	}

});