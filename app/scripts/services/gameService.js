"use strict";

angular.module('gamejamApp').factory('GameService', function($rootScope, RobotIO){
    var service = {};
    service.getNewGame = function (map){
        this.game = new Game(map, $rootScope, RobotIO);
        return this.game;
    }
    service.resetGameFromLastMap = function(){
        if(this.game){
            this.game.reset();
        }
    }
    return service;
});