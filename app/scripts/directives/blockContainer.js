"use strict";

angular.module('gamejamApp').directive('blockContainer', function(){
	return {
		restrict: 'AE',
		scope: {
			'program': '=blockContainer'
		},
		replace: false,
		controller: function($scope){
			var program = $scope.program;

			this.deleteBlock = function(block){
				var pos = program.indexOf(block);
				if(pos !== -1){
					program.splice(pos, 1);
				}
			};

			$scope.activeBlock = null;
			this.setActive = function(block){
				$scope.activeBlock = block;
			};
		}
	};
});