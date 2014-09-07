angular.module('gamejamApp')
    .config(function($stateProvider) {
    	$stateProvider
    		.state('level.wrapup', {
    			url: '/wrapup',
    			controller: 'GameWrapup',
    			templateUrl: 'views/game/wrapup.html'
    		})
    });

angular.module('gamejamApp')
  .controller('GameWrapup', function ($scope, $stateParams, wrapUpService) {
  	$scope.wrapUp = wrapUpService.getWrapUp($stateParams.levelId);
  });
