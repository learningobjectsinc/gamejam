"use strict";

angular.module('gamejamApp').factory('levelService', function(libraryFunctions, libraryStatements){
	this.getLevels = function() {
		return window.gameData.levels;
	};

	this.getLevel = function(levelId){
		return _.findWhere(window.gameData.levels, {id: + levelId});
	};

	this.getBlocks = function(level){
		var blocks = _.map(level.availableBlocks, function(val, key){
			var defaults = libraryStatements[key] || {};
			var cfg = {
				src: defaults.example
			};
			_.extend(cfg, defaults, val);

			return {
				constructor: window[key],
				cfg: cfg
			};
		});

		var fns = _.map(level.availableFunctions, function(val, key){
			if(!key){ return; }
			var defaults = libraryFunctions[key];

			var cfg = {
				label: key,
				src: defaults.example
			};
			_.extend(cfg, defaults, val);

			return {
				constructor: window.FunctionCall,
				cfg: cfg
			};
		});

		return blocks.concat(fns);
	};

	return this;
});