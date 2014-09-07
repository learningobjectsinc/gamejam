'use strict';

angular.module('gamejamApp').directive('childBlocks', function($compile){
	return {
		restrict: 'A',
		scope: {
			blocks: '=childBlocks'
		},
		template: '<div></div>',
		link: function(scope, el){
			var tmpl = '<div ng-repeat="block in blocks" block="block"></div>';
			$compile(tmpl)(scope, function(cloned, scope){
			   el.append(cloned); 
			});	
		}
	};
});