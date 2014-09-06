
var robot = new Robot(7, 5);
var game = new Game({
    height:10,
    width:10
},[
    robot
]);
angular.module('gamejamApp')
    .directive('gameCanvas', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/directives/gameCanvas.html',
            link: function(scope, element) {
                var canvas = $(element).get(0);
                var ctx = canvas.getContext("2d");
                canvas.width = 512;
                canvas.height = 480;

                var then = Date.now();

                // Robot image
                var bgReady = false;
                var bgImage = new Image();
                bgImage.onload = function() {
                    bgReady = true;
                };
                bgImage.src = "images/background.png";

                // The main game loop
                var mainGame = function() {
                    var now = Date.now();
                    var delta = now - then;

                    var canvasSize = {
                        height:canvas.height,
                        width:canvas.width
                    };

                    robot.update(delta / 1000);
                    ctx.drawImage(bgImage, 0, 0);
                    game.render(canvasSize, ctx);

                    //console.log('robot! ', robot);
                    then = now;

                    // Request to do this again ASAP
                    requestAnimationFrame(mainGame);
                };

                mainGame();
            }
        };
    });
