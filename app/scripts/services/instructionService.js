"use strict";

angular.module('gamejamApp').factory('instructionService', function(){
	this.getInstructions = function(levelId){
		return _.findWhere(window.gameData.instructions, {levelId: +levelId});
	};
	return this;
});