"use strict";

angular.module('gamejamApp')
    .config(function($stateProvider) {
    	$stateProvider
    		.state('level', {
    			url: '/level/:levelId',
    			controller: 'LevelCtrl',
    			templateUrl: 'views/game/container.html'
    		})
    });

angular.module('gamejamApp')
    .controller('LevelCtrl', function($stateParams, $scope, levelService) {
        $scope.level = levelService.getLevel($stateParams.levelId);
    });
