"use strict";

angular.module('gamejamApp').factory('GameService', function($rootScope, RobotIO){
    var service = {};
    service.setGame = function(game) {
        this.game = game;
    };
    // service.getNewGame = function (map){
    //     this.game = new Game(map, $rootScope, RobotIO);
    //     return this.game;
    // }
    service.resetGameFromLastMap = function(){
        if(this.game){
            this.game.reset();
        }
    }
    return service;
});