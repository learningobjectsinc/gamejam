"use strict";

angular.module('gamejamApp').directive('block', function($timeout, blockService, libraryFunctions){
	return {
		restrict: 'A',
		scope: {
			'block': '=',
		},
		require: '^blockContainer',
		templateUrl: 'views/directives/block.html',
		link: function(scope, el, attr, container){
			var block = scope.block;
			var program = scope.block.program;

			scope.delete = function(){
				container.deleteBlock(block);
			};

			if(block.constructor.name === 'FunctionCall'){
				scope.cfg = libraryFunctions[block.name];
			}

			scope.isBlockHidden = blockService.dontShow;

			// TODO: Refactor/combine these two
			scope.addToParent = function(blockType, before){
                                var index = _.indexOf(before.parent.children, before);
                                var after = (index == 0) ? null : before.parent.children[index - 1];
				var newBlock = new blockType.constructor();
				newBlock.init(blockType.cfg.src, block.program);
				block.parent.addStatement(newBlock, after);
			};

			scope.addChild = function(blockType){
				var newBlock = new blockType.constructor();
				newBlock.init(blockType.cfg.src, block.program);
				block.addStatement(newBlock);
			};

			scope.updateParam = function(idx){
				var val = block.matches[idx+2];
				var parsedExpr = program.parser.parse($.trim(val));
				block.parameters[idx] = parsedExpr;
			};

			el.click(function(ev){
				ev.stopPropagation(); 
				
				$('.programBlock').removeClass('active');
				el.contents('.programBlock').addClass('active');

				$('.ace_layer .stmt').removeClass('active');
				$('.ace_layer .stmt_' + block.id).addClass('active');
			});

            // Everything below this point is terrible
			el.css({
			    'overflow': 'hidden',
			    'height': '0px',
			    'transitionProperty': 'height',
			    'transitionDuration': '200ms',
			    'transitionTimingFunction': 'ease-in-out'
			});
			$timeout(function(){
				var cts = el.contents('div').get()[0];
				if(!cts){
					return;
				}
				var y = cts.clientHeight;

				el.css('height', y + 'px');
				$timeout(function(){
					el.css('height','auto');
				},200);
			},0);
		}
	};
}).animation('.blockContainer', function($timeout){
	return {
		leave: function(el, done){
			var y = el.get()[0].clientHeight;

			el.css({
			    'overflow': 'hidden',
			    'transitionProperty': 'height',
			    'transitionDuration': '200ms',
			    'transitionTimingFunction': 'ease-in-out'
			});

			el.css('height', y + 'px');
			$timeout(function(){
				el.css('height','0');
				$timeout(function(){
					done();
				},200);
			},0);
		}
	};
});
