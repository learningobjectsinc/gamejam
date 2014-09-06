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

			scope.delete = function(){
				container.deleteBlock(block);
			};
		}
	};
});