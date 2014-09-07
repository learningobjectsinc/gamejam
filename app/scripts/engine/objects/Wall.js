"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Wall = function($rootScope, config) {
        this.image = "images/objects/wall.png";

        // TODO: behaviors
        this.restrictive = true;
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