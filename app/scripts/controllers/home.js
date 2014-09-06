'use strict';

/**
 * @ngdoc function
 * @name gamejamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gamejamApp
 */
angular.module('gamejamApp')
    .controller('HomeCtrl', function($scope, levelService, $state) {
        $scope.levels = levelService.getLevels();

        $scope.loadLevel = function(level) {
            $state.go('level.intro', {
                level: level.id
            });
        };
    });
