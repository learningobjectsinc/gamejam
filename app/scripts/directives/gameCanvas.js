
var robot = new Robot(5, 5);
var game = new Game({
    height:10,
    width:15
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
                var windowHeight = window.innerHeight;
                var windowWidth = window.innerWidth;

                var canvas = $(element).get(0);
                var ctx = canvas.getContext("2d");
                
                canvas.width = windowWidth * 2 / 3;
                canvas.height = canvas.width * 2 / 3 ;


                var then = Date.now();

                // Robot image
                var bgImage = new Image();
                bgImage.onload = function() {
                    var ptrn = ctx.createPattern(bgImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
                    ctx.fillStyle = ptrn;
                    ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
                };
                bgImage.src = "images/backgroundTile.png";

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
