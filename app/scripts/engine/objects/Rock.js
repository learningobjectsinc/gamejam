"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Rock = function($rootScope, config) {
        this.image = "images/objects/rock.png";

        this.behavior = {
            impassable: true,
            destructable: true
        };
    };

    Rock.prototype = {};

    Rock.prototype.render = function(element) {
        // stick yourself in the DOM
    }

    Rock.prototype.destroy = function() {
        // clean up
        this.image = "images/objects/broken_rock.png";
        this.behavior.impassable = false;
    }

    objectFactory.registerObject('Rock', Rock);
})