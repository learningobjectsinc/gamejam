"use strict";

angular.module('gamejamApp').factory('blockService', function(){

	this.getBlocks = function(){
		return window.gameData.blocks;
	};

	this.dontShow = function(block){
        var type = block.constructor.name;
        return (type === 'BlankStatement') ||
            (type === 'EndProgramStatement') ||
            (block.endsBlock && block.matches.length <= 1);
	};

	return this;
});