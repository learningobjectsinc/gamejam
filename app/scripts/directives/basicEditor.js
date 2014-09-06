"use strict";

angular.module('gamejamApp').directive('basicEditor', function(){
	return {
		restrict: 'EA',
		templateUrl: 'views/basicEditor.html',
		scope: {
			'program': '=basicEditor'
		},
		controller: function($scope){
			var program = $scope.program; 

			$scope.pc = '';
			$scope.$watch('program.processor.pc', function(){
				if(!program.processor){
					return;
				}
				$scope.pc = new Array(program.processor.pc).join('\n') + '>';
			});

			$scope.variables = function(){
				if(!program.processor){
					return;
				}
				return _.reduce(program.processor.variables, function(str, value, variable) { 
				    return str + '<div>' + variable + ' = ' + value + '</div>';
				}, '');
			};
		}, link: function(scope, el){
			var existingSource = el.find('.source').val();
			scope.program.code = existingSource;
		}
	};
});
