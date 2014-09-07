"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Goal = function($rootScope, config) {
        this.image = "images/objects/goal.gif";

        this.behavior = {
            win: true
        };
    };

    Goal.prototype = {};

    Goal.prototype.render = function(element) {
        // stick yourself in the DOM
    }

    Goal.prototype.destroy = function() {
        // clean up
    }

    objectFactory.registerObject('Goal', Goal);
})