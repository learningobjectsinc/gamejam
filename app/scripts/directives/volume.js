'use strict';

angular.module('gamejamApp').directive('volume', function($cookies){
    return {
        restrict: 'E',
        templateUrl: 'views/directives/volume.html',
        scope: {
            'track': '='
        },
        link: function(scope, el, attr, container) {
            if (!scope.track) {
                scope.track = "sound/skySanctuary.wav";
            }

            scope.isMusicOn = $cookies.music === "true";
            var audio = $('#music')[0];
            if (scope.isMusicOn) {
                audio.autoplay = "autoplay";
                audio.volume = 0.5;
            } else {
                audio.mute = "mute";
            }

            scope.toggleMusic = function() {
                scope.isMusicOn = !scope.isMusicOn;
                if (scope.isMusicOn) {
                    audio.play();
                } else {
                    audio.pause();
                }
                $cookies.music = scope.isMusicOn;
                scope.volOn = !scope.volOn;
            };
        }
    };
});