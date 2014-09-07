'use strict';

angular.module('gamejamApp').directive('childBlocks', function($compile, blockService){
	return {
		restrict: 'A',
		scope: {
			blocks: '=childBlocks'
		},
		template: '<div></div>',
		link: function(scope, el){
			scope.dontShow = blockService.dontShow;

			var tmpl = '<div ng-repeat="block in blocks" block="block" ng-if="!dontShow(block)"></div>';
			$compile(tmpl)(scope, function(cloned, scope){
			   el.append(cloned); 
			});	
		}
	};
});