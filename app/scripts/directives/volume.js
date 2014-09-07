'use strict';

angular.module('gamejamApp').directive('volume', function($compile){
    return {
        restrict: 'E',
        templateUrl: 'views/directives/volume.html',
        link: function(scope, el, attr, container){
            scope.isMusicOn = true;

            scope.toggleMusic = function() {
                scope.isMusicOn = !scope.isMusicOn;
                if (scope.isMusicOn) {
                    $('#music')[0].play();
                } else {
                    $('#music')[0].pause();
                }
            };
        }
    };
});