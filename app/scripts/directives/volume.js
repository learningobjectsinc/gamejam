'use strict';

angular.module('gamejamApp').directive('volume', function($cookies){
    return {
        restrict: 'E',
        templateUrl: 'views/directives/volume.html',
        link: function(scope, el, attr, container) {
            scope.isMusicOn = $cookies.music === "true";
            var audio = $('#music')[0];
            if (scope.isMusicOn) {
                audio.autoplay = "autoplay";
            } else {
                audio.mute = "mute";
            }

            scope.toggleMusic = function() {
                scope.isMusicOn = !scope.isMusicOn;
                var audio = $('#music')[0];
                if (scope.isMusicOn) {
                    audio.play();
                } else {
                    audio.pause();
                }
                $cookies.music = scope.isMusicOn;
            };
        }
    };
});