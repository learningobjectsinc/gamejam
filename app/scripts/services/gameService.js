"use strict";

angular.module('gamejamApp').factory('GameService', function($rootScope, RobotIO){
    this.getNewGame = function (map){
        return new Game(map, $rootScope, RobotIO);
    }
    return this;
});