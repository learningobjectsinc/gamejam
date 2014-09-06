'use strict';

/**
 * @ngdoc function
 * @name gamejamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gamejamApp
 */
angular.module('gamejamApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'Learning Objects',
      'Difference Engine',
      'CampusPack'
    ];
  });
