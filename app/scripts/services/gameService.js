"use strict";

angular.module('gamejamApp').factory('GameService', function(){
    this.getNewGame = function (map){
        return new Game(map);
    }
    return this;
});