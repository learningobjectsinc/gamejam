"use strict";

angular.module('gamejamApp').factory('wrapUpService', function(){
	this.getWrapUp = function(levelId){
		return _.findWhere(window.gameData.wrapUp, {levelId: +levelId});
	};
	return this;
});