"use strict";

angular.module('gamejamApp').factory('levelService', function(){
	this.getLevels = function() {
		return window.gameData.levels;
	};

	this.getLevel = function(levelId){
		return _.findWhere(window.gameData.levels, {id: +levelId});
	};
	return this;
});