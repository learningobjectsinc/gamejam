angular.module('gamejamApp')
    .directive('gamePaper',
        function(levelService, $stateParams, objectFactory, GameService, RobotIO) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'scripts/directives/gamePaper.html',
                scope: {
                    "level": "="
                },
                link: function(scope, element) {
                    GameService.setGame(this);

                    var width = scope.level.map.width;
                    var height = scope.level.map.height;
                    var grid;


                    var init = function() {
                        grid = scope.grid = {
                            data: []
                        };

                        for (var y = 0; y < scope.level.map.height; y++) {
                            var row = [];
                            for (var x = 0; x < scope.level.map.width; x++) {
                                row.push(null);
                            }
                            grid.data.push(row);
                        }

                        // Get a reference to the canvas object
		        var canvas = element[0];
		        // Create an empty project and a view for the canvas:
		        paper.setup(canvas);

                        var light = new paper.Color(218 / 255, 223 / 255, 43 / 255);
                        var dark = new paper.Color(142 / 255, 145 / 255, 54 / 255);
                        var gray = new paper.Color(.5, .5, .5);
                        var darkGray = new paper.Color(.3, .3, .3);

                        var scannerRotation = 0;
                        var scanner = new paper.Path.Ellipse({
                            point: [134, 4],
                            size: [32, 32],
                            strokeColor: light,
                            strokeWidth: 8
                        });

                        var roundness = new paper.Size(5, 5);

                        var headRect = new paper.Rectangle(new paper.Point(101, 41), new paper.Point(199, 119));
                        var head = new paper.Path.RoundRectangle(headRect, roundness);
                        head.fillColor = light;

                        var eye = new paper.Path.Circle({
                            center: [180, 100],
                            radius: 8
                        });
                        eye.fillColor = dark;

                        var laserPhase = 200;
                        var laser = new paper.Path.Line({
                            from: [180, 100],
                            to: [580, 100],
                            strokeColor: 'red',
                            strokeWidth: 28,
                            opacity: 0,
                            strokeCap: 'round' });

                        var poop = null, poopVx = 1, poopVy = 0, poopOpacity = 0, poopScale = 1.1;

                        var bodyRect = new paper.Rectangle(new paper.Point(111, 121), new paper.Point(189, 169));
                        var body = new paper.Path.RoundRectangle(bodyRect, roundness);
                        body.fillColor = light;

                        var arm = new paper.Path.Line({
                            from: [170, 140],
                            to: [170, 170],
                            strokeColor: dark,
                            strokeWidth: 18,
                            strokeCap: 'round' });
                        arm.pivot = new paper.Point(170, 140);
                        arm.rotate(-40);

                        var waistRect = new paper.Rectangle(new paper.Point(121, 171), new paper.Point(179, 189));
                        var waist = new paper.Path.RoundRectangle(waistRect, roundness);
                        waist.fillColor = dark;

                        var wheelRect = new paper.Rectangle(new paper.Point(114, 194), new paper.Point(186, 216));
                        var wheel = new paper.Path.RoundRectangle(wheelRect, new paper.Size(11, 11));
                        wheel.strokeColor = darkGray;
                        wheel.strokeWidth = 6;

                        var wheels = [];
                        for (var i = 0; i < 5; ++ i) {
                            var wheel = new paper.Path.Circle([ 125 + 12.5 * i, 205 ], 5);
                            wheel.fillColor = gray;
                            wheels.push(wheel);
                        }

                        //var group = new paper.Group({ transformContent: false, children: [ scanner ] }); 

		        // Draw the view now:
		        paper.view.draw();

                        paper.view.onFrame = function(event) {
                            poopOpacity = poopOpacity - .03;
                            if (poopOpacity > 0) {
                                poopVy -= .1;
                                poop.translate(poopVx, poopVy);
                                poop.scale(poopScale);
                                poop.opacity = poopOpacity;
                            } else {
                                if (poop) {
                                    poop.remove();
                                }
                                var poopColor = Math.random() * 0.3;
                                poop = new paper.Path.Circle({
                                    center: [112, 168],
                                    radius: 2,
                                    fillColor: new paper.Color(poopColor * 218 / 255, poopColor * 223 / 255, poopColor * 43 / 255),
                                    opacity: 1 });
                                poopVx = -.7 + -Math.random() * .7;
                                poopVy = Math.random();
                                poopOpacity = 1;
                                poopScale = 1.04 + Math.random() * 0.02;
                            }
                            


                            scannerRotation += 0.05;
                            //group.matrix.set(Math.cos(scannerRotation), 0, 0, 1, 0, 0);
                            //scanner.scale(.5 + Math.cos(scannerRotation) / 3, 1);
                            
                            
                            // craziness, can i not just adjust the ellipse?
                            scanner.remove();
                            var radius = 16 * Math.cos(scannerRotation);
                            scanner = new paper.Path.Ellipse({
                                point: [150 - radius , 4],
                                size: [radius * 2 , 32],
                                strokeColor: light,
                                strokeWidth: 8
                            });

                            laserPhase += 1;
                            var laserWidth = 0, laserOpacity = 0;
                            if (laserPhase < 20) {
                                var laserCos = Math.cos(Math.PI * laserPhase / 40);
                                laserWidth = 16 + 36 * laserCos;
                                laserOpacity = (1 - laserCos) * (1 - laserCos);
                            } else if (laserPhase < 180) {
                                laserWidth = 16;
                                laserOpacity = 1;
                            } else if (laserPhase < 200) {
                                var laserCos = Math.cos(Math.PI * (laserPhase - 180) / 40);
                                laserWidth = 16;
                                laserOpacity = laserCos;
                            } else if (laserPhase > 250) {
                                laserPhase = 0;
                            }
                            laser.strokeWidth = laserWidth;
                            laser.opacity = laserOpacity;
//                            laser.firstSegment.point = new paper.Point(10, 10);
                        };

//                                RobotIO.setRobot(instance);
                    };

                    init();

                    scope.moveObject = function(object, x, y) {
                        //scope.$apply(function() {
                        if (x >= width || y >= height) {
                            return null;
                        }

                        var currentX = object.x,
                            currentY = object.y,
                            moved = false;

                        var collision = grid.data[y][x];
                        if (!collision || (collision.behavior && !collision.behavior.impassable && !collision.behavior.destrucpaper)) {
                            grid.data[y][x] = object;
                            delete grid.data[currentY][currentX];
                            grid.touch = new Date();
                            moved = true;
                        }

                        if (object.type == "Robot" && collision && collision.behavior && collision.behavior.win) {
                            scope.$emit('win');
                        }

                        if (object.type == "Laser" && collision && collision.behavior.destrucpaper) {
                            delete grid.data[currentY][currentX];
                            collision.destroy();
                            grid.touch = new Date();
                        } else if (object.type == "Laser" && collision) {
                            delete grid.data[currentY][currentX];
                            grid.touch = new Date();
                        }

                        return moved;
                        //});
                    };

                    scope.spawnProjectile = function(type, x, y, direction) {
                        var laser = objectFactory.newObject(type, {
                            x: x,
                            y: y,
                            type: "Laser"
                        }, scope);

                        grid.data[y][x] = laser;

                        var position = {
                            x: x,
                            y: y,
                            remaining: null,
                            increment: 1,
                            movement: {
                                direction: direction,
                                axis: (direction == 'up' || direction == 'down') ? 'y' : 'x'
                            }
                        };

                        switch (direction) {
                            case 'up':
                                position.remaining = y;
                                position.increment = -1;
                                break;
                            case 'right':
                                position.remaining = width - x;
                                break;
                            case 'down':
                                position.remaining = height - y;
                                break;
                            case 'left':
                                remaining = x;
                                position.increment = -1;
                                break;
                        }

                        var move = function() {
                            if (position.movement.axis == 'y') {
                                position.y += position.increment;
                                scope.moveObject(laser, position.x, position.y)
                            } else {
                                position.x += position.increment;
                                scope.moveObject(laser, position.x, position.y)
                            }

                            scope.$apply(function() {
                                laser.x = position.x;
                                laser.y = position.y;
                            });

                            position.remaining--;

                            if (position.remaining > 0) {
                                setTimeout(move, 250);
                            }
                        };

                        setTimeout(move, 250);

                        return laser;
                    };

                    this.reset = function() {
                        scope.level = levelService.getLevel($stateParams.levelId);
                        init();
                    };
                }
            };
        }
);
