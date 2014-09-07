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
			scope.isBlank =
				(type === 'BlankStatement') ||
				(type === 'EndProgramStatement') ||
				(block.endsBlock && block.matches.length <= 1);

			scope.delete = function(){
				container.deleteBlock(block);
			};

			el.click(function(ev){
				ev.stopPropagation(); 
				
				$('.programBlock').removeClass('active');
				el.contents('.programBlock').addClass('active');

				$('.ace_layer .stmt').removeClass('active');
				$('.ace_layer .stmt_' + block.id).addClass('active');
			});
		}
	};
});