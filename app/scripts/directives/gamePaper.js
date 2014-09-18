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

                    var animations = null;
                    var then = 0;
                    var robot, roboto, transport, elevators, crates; // gah

                    var init = function() {
                        // Get a reference to the canvas object
		        var canvas = element[0];

                        if (animations) {
                            paper.project.activeLayer.removeChildren();
                        } else {
		            // Create an empty project and a view for the canvas:
		            paper.setup(canvas);
                        }
                        animations = {};
                        crates = [];
                        elevators = [];

                        var light = new paper.Color(218 / 255, 223 / 255, 43 / 255);
                        var dark = new paper.Color(142 / 255, 145 / 255, 54 / 255);
                        var gray = new paper.Color(.5, .5, .5);
                        var darkGray = new paper.Color(.3, .3, .3);

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




                        var waist = new paper.Path.Rectangle({
                            topLeft: [ -29, -48 ],
                            bottomRight: [ 29, -30 ],
                            radius: 5,
                            fillColor: dark
                        });



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




                        robot = new paper.Group({
                            transformContent: false,
                            children: [ wheelGroup, track, waist, body, arm, head, eyeGroup ]
                        });
                        robot.pivot = new paper.Point(0, 0);




                        var Girder = function(o) {
                            this.id = _.uniqueId('girder_');

                            for (var i = 0; i < o.width; ++ i) {
                                new paper.Path.Line({
                                    from: [o.x + 95 + i * 100, 10 + o.y],
                                    to: [o.x + 5 + i * 100, 90 + o.y],
                                    strokeColor: darkGray,
                                    strokeWidth: 10,
                                    strokeCap: 'round' });
                                var floor = new paper.Path.Line({
                                    from: [o.x + 5 + i * 100, 10 + o.y],
                                    to: [o.x + 95 + i * 100, 90 + o.y],
                                    strokeColor: darkGray,
                                    strokeWidth: 10,
                                    strokeCap: 'round' });
                            }
                            new paper.Path.Line({
                                from: [o.x, 5 + o.y],
                                to: [o.x + o.width * 100, 5 + o.y],
                                strokeColor: gray,
                                strokeWidth: 10 });
                            new paper.Path.Line({
                                from: [o.x, 95 + o.y],
                                to: [o.x + 100 * o.width, 95 + o.y],
                                strokeColor: gray,
                                strokeWidth: 10 });
                        };

                        var crateColor0 = new paper.Color(0xb6 / 255, 0x77 / 255, 0x21 / 255);
                        var crateColor1 = new paper.Color(0x7f / 255, 0x54 / 255, 0x17 / 255);
                        var crateColor2 = new paper.Color(0x6f / 255, 0x44 / 255, 0x10 / 255);

                        var Crate = function(o) {
                            this.id = _.uniqueId('crate_');
                            crates.push(this);

                            this.x = o.x;
                            this.y = o.y;

                            var a = [];
                            a.push(new paper.Path.Rectangle({
                                topLeft: [ o.x - 36, o.y - 75 ],
                                bottomRight: [ o.x + 36, o.y - 3 ],
                                radius: 1,
                                strokeColor: crateColor0,
                                fillColor: crateColor1,
                                strokeWidth: 6
                            }));
                            for (var i = 0; i < 4; ++ i) {
                                a.push(new paper.Path.Line({
                                    from: [o.x - 29, o.y - 62 + 15 * i],
                                    to: [o.x + 29, o.y - 62 + 15 * i],
                                    strokeColor: crateColor2,
                                    strokeWidth: 11 }));
                            }
                            this.group = new paper.Group(a);
                        };

                        Crate.prototype.lase = function(o) {
                            _.each(this.group.children, function(item, i) {
                                if (!i) {
                                    item.strokeColor = new paper.Color(crateColor0.red + (1 - crateColor0.red) * o, crateColor0.green * (1 - o), crateColor0.blue * (1 - o));
                                    item.fillColor = new paper.Color(crateColor1.red + (1 - crateColor1.red) * o, crateColor1.green * (1 - o), crateColor1.blue * (1 - o));
                                    if (o > .5) {
                                        item.radius = 1 + 5 * (o - .5);
                                        item.strokeWidth = 6 + 12 * (o - .5);
                                    }
                                } else {
                                    item.strokeColor = new paper.Color(crateColor2.red + (1 - crateColor2.red) * o, crateColor2.green * (1 - o), crateColor2.blue * (1 - o));
                                }
                            });
                        };

                        Crate.prototype.fade = function(o) {
                            this.group.firstChild.strokeWidth = 12 + 24 * (1 - o);
                            this.group.opacity = o;
                        };

                        Crate.prototype.destroy = function(o) {
                            this.group.remove();
                        };


                        var Elevator = function(o) {
                            this.id = _.uniqueId('elevator_');
                            animations[this.id] = this;
                            elevators.push(this); // GAH

                            this.glow = new paper.Path.Line({
                                from: [-80, 20],
                                to: [80, 20],
                                strokeColor: '#0ff',
                                strokeWidth: 20,
                                strokeCap: 'round' });

                            var el = new paper.Path.Line({
                                from: [-100, 10],
                                to: [100, 10],
                                strokeColor: gray,
                                strokeWidth: 20 });

                            this.x = o.x;
                            this.y0 = o.y0;
                            this.y1 = o.y1;
                            this.y = o.y1;
                            this.targetY = o.y0;

                            this.elevator = new paper.Group({ transformContent: false, children: [ this.glow, el ] });
                            this.animate(0, 0);
                        };

                        Elevator.prototype.animate = function(time, delta) {
                            this.glow.opacity = .7 + .3 * Math.cos(time * 10);
                            var deltaY = this.targetY - this.y;
                            if (deltaY) {
                                var abs = Math.abs(deltaY), change = Math.max((abs < 5) ? abs : 5, abs * delta * 3);
                                this.y += ((deltaY < 0) ? -1 : 1) * change;
                                this.elevator.matrix.set(1, 0, 0, 1, this.x, this.y);
                                if (roboto && (roboto.x == this.x)) {
                                    roboto.y = this.y;
                                }
                            }
                        };

                        var Roboto = function(o) {
                            this.id = _.uniqueId('robot_');
                            this.then = then;
                            animations[this.id] = this;
                            roboto = this; // GAH
                            
                            this.x = o.x;
                            this.targetX = o.targetX;
                            this.y = o.y;

                            this.direction = 'right';
                            this.armLocation = 20;
                            this.armTargetLocation = 20;
                            this.armLength = 30;
                            this.armAngle = 0;
                            this.armTargetAngle = .6;
                            this.crash = false;

                            this.animate(0, then);
                        };

                        Roboto.prototype.animate = function(time, delta) {

                            if (!this.crash) {
                                var xRel = this.targetX - this.x;
                                var xDelta = Math.min(Math.abs(xRel), 100 * delta) * ((xRel < 0) ? -1 : 1);
                                this.x = this.x + xDelta;
                                robot.matrix.set(1, 0, 0, 1, this.x, this.y);
                                this.armSwinging = xRel != 0;
                            
                                this.animateScanner(time);
                                this.animateArm(time, delta);
                            }
                            
                            if (this.done) {
                                var phase = (time - this.done) * 50
                                robot.scale(1, Math.pow(2, phase / 10));
                                robot.translate(0, -phase);
                                robot.opacity = Math.max(0, Math.cos(phase / 25));
                                if (phase >= 100) {
                                    scope.$emit('win');
                                    paper.project.activeLayer.removeChildren();
                                    animations = {};
                                }
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
                                this.armTargetAngle = 0.9 * Math.cos(time * 3);
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
                            var armLocationRel = this.armTargetLocation - this.armLocation;
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
                                if (crates.length) {
                                    new Laser();
                                }
                            } else if (method == 'Turn') {
                                var dir = parameters && parameters[0];
                                this.direction = dir || (this.direction == 'right' ? 'left' : 'right');
                                this.armTargetLocation = (this.direction == 'right') ? 20 : -20;
                            } else if (method == 'Busy') {
                                return (this.x != this.targetX)
                                    || (this.armLocation != this.armTargetLocation);
                            } else if (method == 'Talk') {
                                this.speak(parameters[0]);
                            } else if ((method == 'Down') || (method == 'Up')) {
                                _.each(elevators, function(elevator) {
                                    if ((roboto.x == elevator.x) && (roboto.y == elevator.y)) {
                                        elevator.targetY = (elevator.targetY == elevator.y0) ? elevator.y1 : elevator.y0;
                                    }
                                });
                            } else {
                                console.log(method);
                            }
                        };

                        Roboto.prototype.speak = function(text) {
                            scope.$broadcast('robot.talk', {
                                uttering: text
                            });
                            if ('speechSynthesis' in window) {
                                var utterance = new SpeechSynthesisUtterance(text);
                                window.speechSynthesis.speak(utterance);
                            }
                        };

                        Roboto.prototype.finished = function(text) {
                            if (this.done) {
                                return;
                            }
                            this.done = then;
                            this.speak('Yippeeeeee');
                        };

                        Roboto.prototype.crashed = function() {
                            if (this.crash) {
                                return;
                            }
                            this.crash = true;
                            this.scanner.translate(0, 45);
                            head.translate(0, 45);
                            eye.translate(0, 45);
                            body.translate(0, 25);
                            arm.translate(0, 35);
                            waist.translate(0, 15);
                            for (var i = 0; i < 20; ++ i) {
                                var o = (i % 2) ? -1 : 1;
                                var center = new paper.Point(49 * o -7 + 14 * Math.random(), -178 + 45 + 78 * Math.random());
                                var translated = robot.localToGlobal(center);
                                var vx  = (12 + Math.random() * 12) * o;
                                var vy = 12 - Math.random() * 24;
                                new Toot({
                                    center: translated,
                                    vx: vx,
                                    vy: vy,
                                    color: light
                                });
                            }
                            this.speak('Ayeeeeeeeeeeeeeeee!');
                        };

                        Roboto.prototype.toot = function() {
                            var sign = (this.direction == 'right') ? -1 : 1;
                            var center = new paper.Point(38 * sign, -51);
                            var translated = robot.localToGlobal(center);
                            var vx  = (25  + Math.random() * 25) * sign;
                            var vy = Math.random() * 15;
try {
                            new Toot({
                                center: translated,
                                vx: vx,
                                vy: vy,
                                color: light
                            });
} catch (e) {
console.log('wth', e);
}
                        };

                        var Toot = function(o) {
                            this.id = _.uniqueId('toot_');
                            animations[this.id] = this;
                            this.then = then;
                            var color = .5 + Math.random() * 0.3;
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
                            transport = this; // GAH
                            this.then = then;
                            this.x = o.x;
                            this.y = o.y;
                            var color = new paper.Color(0, 1, 1);
                            this.arcs = [];
                            for (var i = 0; i < 4; ++ i) {
                                var phase = i / 2;
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
                                    arcGroup.phase = phase;
                                    arcGroup.multiplier1 = multiplier1;
                                    arcGroup.y = o.y - 30;
                                    if (j < 0) {
                                        arcGroup.sendToBack();
                                    }
                                    this.arcs.push(arcGroup);
                                }
                            }
                            this.animate(then, 0);
                        };

                        Transport.prototype.animate = function(time, delta) {
                            var y = this.y, x = this.x, deltaX = Math.abs(roboto.x - x), evade = (deltaX > 10) && (deltaX < 150) && (this.y == roboto.y);
                            if (!deltaX && (this.y == roboto.y)) {
                                roboto.finished();
                            }
                            var deltaT = (time - this.then);
                            _.each(this.arcs, function(arc) {
                                arc.opacity = .7 - .3 * Math.cos(deltaT * arc.multiplier1);
                                var targetY = y - (evade ? 250 : 110) + (evade ? 40 : 80) * Math.cos(deltaT * 3 + arc.phase);
                                var relative = targetY - arc.y;
                                var deltaY = Math.min(Math.abs(relative), Math.abs(relative) * delta * 3) * ((relative < 0) ? -1 : 1);
                                arc.y = arc.y + deltaY;
                                arc.matrix.set(1, 0, 0, 1, x, arc.y);
                            });
                        };

                        var Laser = function() {
                            this.id = _.uniqueId('laser_');
                            animations[this.id] = this;
                            this.then = then;
                            
                            this.crate = crates.shift();
                            this.target = new paper.Point([ this.crate.x - 16*0, this.crate.y - 50]); // 800 * Math.random(), 400 * Math.random() ]);
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
                                this.crate.lase((phase - 20) / 60);
                            } else if (phase < 100) {
                                var laserCos = Math.cos(Math.PI * (phase - 80) / 40);
                                laserWidth = 14;
                                laserOpacity = laserCos;
                                this.crate.fade(laserCos);
                            } else {
                                this.crate.destroy();
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

                        var objects = {
                            Girder: Girder,
                            Crate: Crate,
                            Elevator: Elevator,
                            Roboto: Roboto,
                            Transport: Transport
                        };

                        console.log(objects);
                        _.each(scope.level.objects, function(o) {
                            var object = objects[o.type];
                            new object(o);
                        });


                        var ow = 0;
                        var onResize = function() {
                            var w = $('#game').width() * 2 / 3 - 6;
                            if (w == ow) {
                                return;
                            }
                            ow = w;
                            paper.view.viewSize = new paper.Size(w, w * height / width);
                            paper.view.center = [ width * 100 / 2, height * 100 / 2 ];
                            paper.view.zoom = w / 100 / width;
                        };

                        onResize();

		        // Draw the view now:
		        paper.view.draw();

                        paper.view.onFrame = function(event) {
                            onResize();
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

                    this.reset = function() {
                        scope.level = levelService.getLevel($stateParams.levelId);
                        init();
                    };
                }
            };
        }
);
