"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Laser = function(config, $rootScope) {
        _.extend(this, config);
        this.image = "images/objects/laser.png";
    };

    Laser.prototype = {};

    Laser.prototype.render = function(element) {
        // stick yourself in the DOM
    }

    Laser.prototype.destroy = function() {
        // clean up
    }

    objectFactory.registerObject('Laser', Laser);
})