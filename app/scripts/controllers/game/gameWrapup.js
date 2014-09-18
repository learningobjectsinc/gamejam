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
  .controller('GameWrapup', function ($scope, $stateParams, wrapUpService, levelService, $location, $state) {
    $scope.goLevel = function(levelId){
        if(levelId >= 4){
            $state.go('home');
        } else {
            $state.go('level.intro', {levelId:levelId});
        }
    }

  	$scope.wrapUp = wrapUpService.getWrapUp($stateParams.levelId);
  });
