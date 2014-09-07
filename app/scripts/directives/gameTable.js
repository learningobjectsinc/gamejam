angular.module('gamejamApp')
    .directive('gameTable',
        function(objectFactory, RobotIO) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'scripts/directives/gameTable.html',
                scope: {
                    "level": "="
                },
                link: function(scope, element) {
                    var grid = scope.grid = {
                        data: []
                    };
                    var width = scope.level.map.width;
                    var height = scope.level.map.height;

                    for (var y = 0; y < scope.level.map.height; y++) {
                        var row = [];
                        for (var x = 0; x < scope.level.map.width; x++) {
                            row.push(null);
                        }
                        grid.data.push(row);
                    }

                    _.each(scope.level.map.objects, function(object) {
                        // instantiate and add to table

                        // hopefully temporary legacy config format
                        if (!object.config) {
                            object.config = {
                                x: object.x - 1,
                                y: object.y - 1,
                                direction: object.direction
                            };
                        }

                        var instance = objectFactory.newObject(object.type, object.config, scope);
                        var y = object.config.y || 0;
                        var x = object.config.x || 0;
                        grid.data[y][x] = instance;
                        if (object.type === 'Robot') {
                            RobotIO.setRobot(instance);
                        }
                    });

                    scope.moveObject = function(object, x, y) {
                        //scope.$apply(function() {
                            if (x >= width || y >= height) {
                                return null;
                            }

                            var currentX = object.x,
                                currentY = object.y;

                            var collision = grid.data[y][x];
                            if (!collision || (collision.behavior && !collision.behavior.impassable && !collision.behavior.destructable)) {
                                grid.data[y][x] = object;
                                delete grid.data[currentY][currentX];
                                grid.touch = new Date();
                            }

                            if (object.type == "Robot" && collision && collision.behavior.win) {
                                scope.$emit('win');
                            }

                            if (object.type == "Laser" && collision && collision.behavior.destructable) {
                                delete grid.data[currentY][currentX];
                                collision.destroy();
                                grid.touch = new Date();
                            } else if (object.type == "Laser" && collision) {
                                delete grid.data[currentY][currentX];
                                grid.touch = new Date();
                            }
                        //});
                    };

                    scope.spawnProjectile = function(type, x, y, direction) {
                        var laser = objectFactory.newObject(type, { x: x, y: y, type: "Laser" }, scope);

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
                }
            };
        }
);
