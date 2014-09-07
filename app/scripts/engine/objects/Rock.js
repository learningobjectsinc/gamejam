"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Rock = function($rootScope, config) {
        this.image = "images/objects/rock.png";

        this.behaviors = {
            impassable: true
        };
    };

    Rock.prototype = {};

    Rock.prototype.render = function(element) {
        // stick yourself in the DOM
    }

    Rock.prototype.destroy = function() {
        // clean up
    }

    objectFactory.registerObject('Rock', Rock);
})