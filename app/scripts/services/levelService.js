"use strict";

angular.module('gamejamApp').factory('levelService', function(){
	this.getLevel = function(levelId){
		return _.findWhere(window.gameData.levels, {id: +levelId});
	};
	return this;
});