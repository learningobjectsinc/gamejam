"use strict";

angular.module('gamejamApp').directive('block', function($timeout, blockService){
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

			scope.isBlockHidden = blockService.dontShow;

			scope.addToParent = function(blockType){
				var newBlock = new blockType.constructor();
				newBlock.init(blockType.cfg.src, block.program);
				block.parent.addStatement(newBlock);
			};

			scope.addChild = function(blockType){
				var newBlock = new blockType.constructor();
				newBlock.init(blockType.cfg.src, block.program);
				block.addStatement(newBlock);
			};

			el.click(function(ev){
				ev.stopPropagation(); 
				
				$('.programBlock').removeClass('active');
				el.contents('.programBlock').addClass('active');

				$('.ace_layer .stmt').removeClass('active');
				$('.ace_layer .stmt_' + block.id).addClass('active');
			});


			el.css({
			    'overflow': 'hidden',
			    'height': '0px',
			    'transitionProperty': 'height',
			    'transitionDuration': '200ms',
			    'transitionTimingFunction': 'ease-in-out'
			});
			$timeout(function(){
				var y = el.contents('div').get()[0].clientHeight;
				el.css('height', y + 'px');
				$timeout(function(){
					el.css('height','auto');
				},200);
			},0);
		}
	};
});