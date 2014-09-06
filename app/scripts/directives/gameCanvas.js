angular.module('gamejamApp')
    .directive('gameCanvas', ['GameService', function(gameService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/directives/gameCanvas.html',
            scope: {
                "level": "="
            },
            link: function(scope, element) {
                var game = gameService.getNewGame(scope.level.map);

                var windowHeight = window.innerHeight;
                var windowWidth = window.innerWidth;

                var canvas = $(element).get(0);
                var ctx = canvas.getContext("2d");
                
                canvas.width = windowWidth * 2 / 3;
                canvas.height = canvas.width * 2 / 3 ;

                var then = Date.now();

                // The main game loop
                var mainGame = function() {
                    var now = Date.now();
                    var delta = now - then;

                    var canvasSize = {
                        height:canvas.height,
                        width:canvas.width
                    };

                    game.update(delta / 1000);

                    game.render(canvasSize, ctx);

                    //console.log('robot! ', robot);
                    then = now;

                    // Request to do this again ASAP
                    requestAnimationFrame(mainGame);
                };

                mainGame();
            }
        };
    }]);
