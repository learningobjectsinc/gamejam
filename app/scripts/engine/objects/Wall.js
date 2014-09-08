"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Wall = function($rootScope, config) {
        this.image = "images/objects/wall5.svg";

        this.behavior = {
            impassable: true
        };
    };

    Wall.prototype = {};

    Wall.prototype.render = function(element) {
        // stick yourself in the DOM
    }

    Wall.prototype.destroy = function() {
        // clean up
    }

    objectFactory.registerObject('Wall', Wall);
})