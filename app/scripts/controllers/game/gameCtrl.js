"use strict";

angular.module('gamejamApp')
  .controller('GameCtrl', function ($stateParams, $scope, levelService) {
  	$scope.level = levelService.getLevel($stateParams.levelId);
  });
