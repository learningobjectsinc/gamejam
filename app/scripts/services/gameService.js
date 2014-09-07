"use strict";

angular.module('gamejamApp').factory('GameService', function($rootScope){
    this.getNewGame = function (map){
        return new Game(map, $rootScope);
    }
    return this;
});