/*
Step()
Step()
Step()
Step()
WHILE 0 < 1
LET r = random()
IF r < .25 THEN
  Fire()
END IF
IF r >= .25 THEN
  IF (r < .5) THEN
    TurnLeft()
  END IF
END IF
IF r >= .5 THEN
  IF (r < .75) THEN
    TurnRight()
  END IF
END IF
IF r >= .75 THEN
  IF (r < 1) THEN
    Step()
  END IF
END IF
END WHILE

Fire()
Step()
Step()
TurnLeft()
Fire()
Step()
TurnRight()
Step()
Step()
Fire()
TurnLeft()
Step()
Fire()
*/

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

                    var animations = null;
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

                        if (animations) {
                            paper.project.activeLayer.removeChildren();
                        } else {
		            // Create an empty project and a view for the canvas:
		            paper.setup(canvas);
                        }
                        animations = {};

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
                            center: [0, 0],
                            radius: 8,
                            fillColor: dark
                        });
                        var eyeGroup = new paper.Group({ transformContent: false, children: [ eye ] });
                        eyeGroup.translate(30, -119);

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
                            children: [ head, eyeGroup, body, arm, waist, track, wheelGroup ]
                        });
                        robot.pivot = new paper.Point(0, 0);
                        robot.translate(100, 400);

                        var Roboto = function() {
                            this.id = _.uniqueId('robot_');
                            this.then = then;
                            animations[this.id] = this;
                            
                            this.x = 0;
                            this.targetX = 0;

                            this.direction = 'right';
                            this.armLocation = 20;
                            this.armLength = 30;
                            this.armAngle = 0;
                            this.armTargetAngle = .6;

                            this.animate(0, then);
                        };

                        Roboto.prototype.animate = function(time, delta) {

                            var xRel = this.targetX - this.x;
                            var xDelta = Math.min(Math.abs(xRel), 100 * delta) * ((xRel < 0) ? -1 : 1);
                            this.x = this.x + xDelta;
                            robot.translate(xDelta, 0);
                            this.armSwinging = xDelta != 0;

                            this.animateScanner(time);
                            this.animateArm(time, delta);

                            if ((this.x == 600) && !this.done) {
                                this.done = time;
                            }
                            if (this.done) {
                                var phase = (time - this.done) * 50
                                robot.scale(1, 1 + phase / 100);
                                robot.translate(0, -phase / 5);
                                robot.opacity = Math.max(0, Math.cos(phase / 25));
                            }
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


                        Roboto.prototype.animateArm = function(time, delta) {
                            if (this.armSwinging) {
                                this.armTargetAngle = 0.9 * Math.cos(time * 2);
                                if (Math.random() < .2) {
                                    this.toot();
                                }
                            } else {
                                this.armTargetAngle = (this.direction == 'right') ? .6 : -.6;
                            }
                            var armAngleRel = this.armTargetAngle - this.armAngle;
                            var armAngleChange = Math.abs(armAngleRel);
                            var armAngleDelta = Math.min(armAngleChange, 3 * delta);
                            this.armAngle = this.armAngle + ((armAngleRel < 0) ? -armAngleDelta : armAngleDelta);
                            var armTargetLocation = (this.direction == 'right') ? 20 : -20;
                            var armLocationRel = armTargetLocation - this.armLocation;
                            var armLocationChange = Math.abs(armLocationRel);
                            var armLocationDelta = Math.min(armLocationChange, 120 * delta);
                            this.armLocation = this.armLocation + ((armLocationRel < 0) ? -armLocationDelta : armLocationDelta);
                            var x = this.armLocation, y = -79;
                            arm.firstSegment.point = new paper.Point(x, y);
                            arm.lastSegment.point = new paper.Point(x + this.armLength * Math.sin(this.armAngle), y + this.armLength * Math.cos(this.armAngle));

                            this.eyeLocation = this.armLocation * 3 / 2;
                            eyeGroup.matrix.set(1, 0, 0, 1, this.eyeLocation, -119);
                        };

                        Roboto.prototype.invoke = function(method, parameters) {
                            if (method == 'MoveForward') {
                                this.targetX += (this.direction == 'right') ? 100 : -100;
                            } else if (method == 'FireLaser') {
                                new Laser();
                            } else if (method == 'Turn') {
                                this.direction = parameters[0];
                            } else {
                                console.log(method);
                            }
                        };

                        Roboto.prototype.toot = function() {
                            var sign = (this.direction == 'right') ? -1 : 1;
                            var center = new paper.Point(38 * sign, -51);
                            var translated = robot.localToGlobal(center);
                            var vx  = (25  + Math.random() * 25) * sign;
                            var vy = Math.random() * 15;
                            new Toot({
                                center: translated,
                                vx: vx,
                                vy: vy,
                                color: light
                            });
                        };

                        var roboto = new Roboto();

                        var Toot = function(o) {
                            this.id = _.uniqueId('toot_');
                            animations[this.id] = this;
                            this.then = then;
                            var color = Math.random() * 0.3;
                            var toot = new paper.Path.Circle({
                                center: [0, 0],
                                radius: 2,
                                fillColor: new paper.Color(o.color.red * color, o.color.green * color, o.color.blue * color),
                                opacity: 1 });
                            this.toot = new paper.Group({ transformContent: false, children: [ toot ] });
                            // this.toot.sendToBack();
                            this.center = o.center;
                            this.vx  = o.vx;
                            this.vy = o.vy;
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

                        var Transport = function(o) {
                            this.id = _.uniqueId('transport_');
                            animations[this.id] = this;
                            this.then = then;
                            var color = new paper.Color(0, 1, 1);
                            this.arcs = [];
                            for (var i = 0; i < 4; ++ i) {
                                var multiplier0 = (i + 3) / (i + 1);
                                var multiplier1 = (i + 2) / (i + .1);
                                for (var j = -1; j <= 1; j += 2) {
                                    var arc = new paper.Path({
                                        segments: [
                                            new paper.Segment({
                                                point: [ -60, 0 ],
                                                handleOut: [ -1 * j, 30 * j ]
                                            }),
                                            new paper.Segment({
                                                point: [ 60, 0 ],
                                                handleIn: [ 1 * j, 30 * j ]
                                            })
                                        ],
                                        strokeColor: color,
                                        strokeWidth: 8
                                    });
                                    var arcGroup = new paper.Group({ transformContent: false, children: [ arc ] });
                                    arcGroup.multiplier0 = multiplier0;
                                    arcGroup.multiplier1 = multiplier1;
                                    if (j < 0) {
                                        arcGroup.sendToBack();
                                    }
                                    this.arcs.push(arcGroup);
                                }
                            }
                            this.animate();
                        };

                        Transport.prototype.animate = function(time) {
                            var delta = (time - this.then);
                            _.each(this.arcs, function(arc) {
                                arc.opacity = .7 - .3 * Math.cos(delta * arc.multiplier1);
                                arc.matrix.set(1, 0, 0, 1, 700, 290 + 80 * Math.cos(delta * arc.multiplier0));
                            });
                        };

                        new Transport();

                        var Laser = function() {
                            this.id = _.uniqueId('laser_');
                            animations[this.id] = this;
                            this.then = then;
                            this.target = new paper.Point([ 800 * Math.random(), 400 * Math.random() ]);
                            this.laser = new paper.Path.Line({
                                from: this.target,
                                to: this.target,
                                strokeColor: 'red',
                                strokeWidth: 14,
                                opacity: 0,
                                strokeCap: 'round'
                            });
                        };

                        Laser.prototype.animate = function(time) {
                            var phase = (time - this.then) * 50;
                            var laserWidth = 0, laserOpacity = 0;
                            if (phase < 20) {
                                var laserCos = Math.cos(Math.PI * phase / 40);
                                laserWidth = 14 + 36 * laserCos;
                                laserOpacity = (1 - laserCos) * (1 - laserCos);
                            } else if (phase < 80) {
                                laserWidth = 14;
                                laserOpacity = 1;
                            } else if (phase < 100) {
                                var laserCos = Math.cos(Math.PI * (phase - 80) / 40);
                                laserWidth = 14;
                                laserOpacity = laserCos;
                            } else {
                                this.destroy();
                                return;
                            }
                            if ((phase >= 20) && (Math.random() < .3)) {
                                var vx  = -25  + Math.random() * 50;
                                var vy = -Math.random() * 15;
                                new Toot({
                                    center: this.target,
                                    vx: vx,
                                    vy: vy,
                                    color: gray
                                });
                            }

                            var center = new paper.Point(roboto.eyeLocation, -119);
                            var adjusted = robot.localToGlobal(center);

                            this.laser.strokeWidth = laserWidth;
                            this.laser.opacity = laserOpacity;
                            this.laser.firstSegment.point = adjusted;
                        };

                        Laser.prototype.destroy = function() {
                            if (this.laser) {
                                this.laser.remove();
                                delete this.laser;
                            }
                            delete animations[this.id];
                        };

		        // Draw the view now:
		        paper.view.draw();

                        paper.view.onFrame = function(event) {
                            then = event.time;
                            _.each(animations, function(animation) {
                                animation.animate(event.time, event.delta);
                            });

                        };

                        RobotIO.setRobot(roboto);
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
