"use strict";

angular.module('gamejamApp').factory('blockService', function(){

	this.getBlocks = function(){
		return window.gameData.blocks;
	};

	return this;
});