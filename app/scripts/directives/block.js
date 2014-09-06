"use strict";

angular.module('gamejamApp').directive('block', function(){
	return {
		restrict: 'A',
		scope: {
			'block': '='
		},
		require: '^blockContainer',
		templateUrl: 'views/directives/block.html',
		link: function(scope, el, attr, container){
			var block = scope.block;

			var type = block.constructor.name;
			scope.isBlank = type === 'BlankStatement';

			scope.delete = function(){
				container.deleteBlock(block);
			};
		}
	};
});