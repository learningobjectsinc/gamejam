"use strict";

angular.module('gamejamApp')
.config(function($stateProvider) {
    $stateProvider
        .state('newLevel', {
            url: '/newLevel',
            controller: 'LevelCreator',
            templateUrl: 'views/level/new.html'
        })
});

angular.module('gamejamApp')
.controller('LevelCreator', function($scope, levelService){
    initObjectTypes();
    initImages();
    newGrid();

    function initObjectTypes() {
        $scope.objectTypes = ["Empty", "Goal", "Robot", "Rock", "Troll", "Wall"];
    }

    function initImages() {
        $scope.images = {
            "Robot": "images/robot/robot-down.svg",
            "Goal": "images/objects/goal.gif",
            "Rock": "images/objects/rock.png",
            "Wall": "images/objects/wall5.svg",
            "Troll": "images/objects/troll.png"
        };
    }

    function newGrid() {
        $scope.numRows = 8;
        $scope.numCols = 8;
        $scope.grid = [];
        for (var y = 0; y < $scope.numRows; y++) {
            $scope.grid[y] = [];
            for (var x = 0; x < $scope.numCols; x++) {
                var printX = x + 1;
                var printY = y + 1;
                $scope.grid[y][x] = "Wall";
            }
        }
    }

    function updateGrid() {
        var oldNumCols = $scope.grid[0].length;
        var oldNumRows = $scope.grid.length;

        if ($scope.numCols < oldNumCols) {
            // Column(s) deleted.
            for (var y = 0; y < $scope.numRows; y++) {
                $scope.grid[y].splice($scope.numCols, oldNumCols - $scope.numCols);
            }
        } else if ($scope.numCols > oldNumCols) {
            // Column(s) added.
            for (var y = 0; y < $scope.numRows; y++) {
                for (var x = oldNumCols; x < $scope.numCols; x++) {
                    $scope.grid[y][x] = "Empty";
                }
            }
        }
        
        if ($scope.numRows < oldNumRows) {
            // Row(s) deleted.
            $scope.grid.splice($scope.numRows, oldNumRows - $scope.numRows);
        } else if ($scope.numRows > oldNumRows) {
            // Row(s) added.
            for (var y = oldNumRows; y < $scope.numRows; y++) {
                $scope.grid[y] = [];
                for (var x = 0; x < $scope.numCols; x++) {
                    $scope.grid[y][x] = "Empty";
                }
            }
        }
    }

    $scope.$watch('numRows', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateGrid();
        }
    });

    $scope.$watch('numCols', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateGrid();
        }
    });

    $scope.createLevel = function() {
        function buildMap() {
            var map = {};
            map.width = $scope.numCols;
            map.height = $scope.numRows;
            map.objects = [];
            for (var x = 0; x < $scope.numCols; x++) {
                for (var y = 0; y < $scope.numRows; y++) {
                    var type = $scope.grid[y][x];
                    if (type !== "Empty") {
                        var object = {
                            "type": type,
                            "x": x+1,
                            "y": y+1
                        };
                        map.objects.push(object);
                    }
                }
            }
            return map;
        }
        var level = {
            "id": $scope.levelId,
            "name": $scope.levelName,
            "map": buildMap()
        };
        $scope.results = JSON.stringify(level, undefined, 4);
    }
});