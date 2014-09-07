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
                        console.log('move', object, x, y);
                        scope.$apply(function() {
                            if (x >= width || y >= height) {
                                return null;
                            }

                            var currentX = object.x,
                                currentY = object.y;

                            var collision = grid.data[y][x];
                            if (!collision || !collision.behavior.impassable) {
                                grid.data[y][x] = object;
                                delete grid.data[currentY][currentX];
                                grid.touch = new Date();
                            }

                            if (collision && collision.behavior.win) {
                                scope.$emit('win');
                            }
                        });
                    };
                }
            };
        }
);
