"use strict";

angular.module('gamejamApp').factory('levelService', function(){
	this.getLevels = function() {
		return window.gameData.levels;
	};

	this.getLevel = function(levelId){
		return _.findWhere(window.gameData.levels, {id: +levelId});
	};

	this.getBlocks = function(level){
		var blocks = _.map(level.availableBlocks, function(val, key){
			return {
				constructor: window[key],
				cfg: val
			};
		});

		return blocks;
	};

	return this;
});