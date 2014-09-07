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
                            block.destroy();
			};

			$scope.activeBlock = null;
			this.setActive = function(block){
				$scope.activeBlock = block;
			};
		}
	};
});
