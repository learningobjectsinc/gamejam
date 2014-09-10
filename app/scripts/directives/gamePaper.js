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

                    var animations = {};
                    var then = 0;
                    var robot;

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


                        var floor = new paper.Path.Line({
                            from: [0, 400],
                            to: [800, 400],
                            strokeColor: 'black',
                            strokeWidth: 1 });

                        var light = new paper.Color(218 / 255, 223 / 255, 43 / 255);
                        var dark = new paper.Color(142 / 255, 145 / 255, 54 / 255);
                        var gray = new paper.Color(.5, .5, .5);
                        var darkGray = new paper.Color(.3, .3, .3);

// 150/219
                        var head = new paper.Path.Rectangle({
                            topLeft: [ -49, -178],
                            bottomRight: [ 49, -100 ],
                            radius: 5,
                            fillColor: light
                        });

                        var eye = new paper.Path.Circle({
                            center: [30, -119],
                            radius: 8,
                            fillColor: dark
                        });

                        var laserPhase = 200;
                        var laser = new paper.Path.Line({
                            from: [30, -119],
                            to: [580, -119],
                            strokeColor: 'red',
                            strokeWidth: 28,
                            opacity: 0,
                            strokeCap: 'round' });

                        var body = new paper.Path.Rectangle({
                            topLeft: [ -39, -98 ],
                            bottomRight: [ 39, -50 ],
                            radius: 5,
                            fillColor: light
                        });

                        var arm = new paper.Path.Line({
                            from: [20, -79],
                            to: [20, -49],
                            strokeColor: dark,
                            strokeWidth: 18,
                            strokeCap: 'round' });
                        arm.pivot = new paper.Point(20, -79);
                        arm.rotate(40);
                        arm.translate(-40, 0);

                        var waist = new paper.Path.Rectangle({
                            topLeft: [ -29, -48 ],
                            bottomRight: [ 29, -30 ],
                            radius: 5,
                            fillColor: dark
                        });

                        var track = new paper.Path.Rectangle({
                            topLeft: [ -36, -25 ],
                            bottomRight: [ 36, -3 ],
                            radius: 11,
                            strokeColor: darkGray,
                            strokeWidth: 6
                        });

                        var wheels = [];
                        for (var i = 0; i < 5; ++ i) {
                            var wheel = new paper.Path.Circle({
                                center: [ -25 + 12.5 * i, -14 ],
                                radius: 5,
                                fillColor: gray
                            });
                            wheels.push(wheel);
                        }
                        var wheelGroup = new paper.Group(wheels);

                        robot = new paper.Group({
                            transformContent: false,
                            children: [ head, eye, laser, body, arm, waist, track, wheelGroup ]
                        });
                        robot.translate(100, 400);

                        var Roboto = function() {
                            this.id = _.uniqueId('robot_');
                            this.then = then;
                            animations[this.id] = this;

                            this.armLocation = 20;
                            this.armLength = 30;
                            this.armAngle = .6;
                            this.armTargetAngle = -.6;
                            this.armTargetLocation = 20;

                            this.animate(0, then);
                        };

                        Roboto.prototype.animate = function(time, delta) {
                            this.animateScanner(time);
                            this.animateArm(time, delta);
                        };

                        Roboto.prototype.animateScanner = function(time) {
                            var delta = (time - this.then) * 3;
                            // craziness, can i not just adjust the ellipse?
                            if (this.scanner) {
                                this.scanner.remove();
                            }
                            var radius = 16 * Math.cos(delta);
                            this.scanner = new paper.Path.Ellipse({
                                point: [- radius , -215],
                                size: [radius * 2 , 32],
                                strokeColor: light,
                                strokeWidth: 8
                            });
                            robot.addChild(this.scanner);
                        };

                        Roboto.prototype.armAnimation = function(on) {
                            this.armSwinging = on;
                        };

                        Roboto.prototype.animateArm = function(time, delta) {
                            if (this.armSwinging) {
                                this.armTargetAngle = 0.9 * Math.cos(time * 2);
                            }
                            var armAngleRel = this.armTargetAngle - this.armAngle;
                            var armAngleChange = Math.abs(armAngleRel);
                            var armAngleDelta = Math.min(armAngleChange, 1.5 * delta);
                            this.armAngle = this.armAngle + ((armAngleRel < 0) ? -armAngleDelta : armAngleDelta);
                            var armLocationRel = this.armTargetLocation - this.armLocation;
                            var armLocationChange = Math.abs(armLocationRel);
                            var armLocationDelta = Math.min(armLocationChange, 120 * delta);
                            this.armLocation = this.armLocation + ((armLocationRel < 0) ? -armLocationDelta : armLocationDelta);
                            var x = this.armLocation, y = -79;
                            arm.firstSegment.point = new paper.Point(x, y);
                            arm.lastSegment.point = new paper.Point(x + this.armLength * Math.sin(this.armAngle), y + this.armLength * Math.cos(this.armAngle));
                        };

                        var roboto = new Roboto();
                        roboto.armAnimation(true);

                        var Toot = function() {
                            this.id = _.uniqueId('toot_');
                            animations[this.id] = this;
                            this.then = then;
                            var color = Math.random() * 0.3;
                            var toot = new paper.Path.Circle({
                                center: [0, 0],
                                radius: 2,
                                fillColor: new paper.Color(light.red * color, light.green * color, light.blue * color),
                                opacity: 1 });
                            this.toot = new paper.Group({ transformContent: false, children: [ toot ] });
                            this.toot.sendToBack();
                            var center = new paper.Point(-38, -51);
                            this.center = robot.localToGlobal(center);
                            this.vx  = -25  - Math.random() * 25;
                            this.vy = Math.random() * 15;
                            this.scale = 5 + Math.random() * 3;
                            this.animate(then);
                        };

                        Toot.prototype.animate = function(time) {
                            var delta = (time - this.then) / 1;
                            if (delta >= 1.0) {
                                this.toot.remove();
                                delete animations[this.id];
                                return;
                            }
                            var scale = 1 + this.scale * delta * delta;
                            this.toot.matrix.set(scale, 0, 0, scale, this.center.x + this.vx * delta, this.center.y + this.vy * delta - 40 * delta * delta);
                            this.toot.opacity = .7 * (1 - delta);
                        };

		        // Draw the view now:
		        paper.view.draw();

                        paper.view.onFrame = function(event) {
                            then = event.time;
                            _.each(animations, function(animation) {
                                animation.animate(event.time, event.delta);
                            });

                            if (Math.random() < .05)
                                new Toot();


                            laserPhase += 1;
                            var laserWidth = 0, laserOpacity = 0;
                            if (laserPhase < 20) {
                                var laserCos = Math.cos(Math.PI * laserPhase / 40);
                                laserWidth = 14 + 36 * laserCos;
                                laserOpacity = (1 - laserCos) * (1 - laserCos);
                            } else if (laserPhase < 180) {
                                laserWidth = 14;
                                laserOpacity = 1;
                            } else if (laserPhase < 200) {
                                var laserCos = Math.cos(Math.PI * (laserPhase - 180) / 40);
                                laserWidth = 14;
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

                        robot.translate(50, 0);
/*
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
*/
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
