"use strict";

angular.module("gamejamApp").run(function(objectFactory) {
    var Robot = function(config, table) {
        var self = this;

        self.type = "Robot";

        _.extend(self, config);

        
        
        switch (self.direction) {
            case 'up':
                this.image = "images/robot/robot-up.svg";
                break;
            case 'right':
                this.image = "images/robot/robot-right.svg";
                break;
            case 'down':
                this.image = "images/robot/robot-down.svg";
                break;
            case 'left':
                this.image = "images/robot/robot-left.svg";
                break;
            default:
                this.image = "images/robot/robot-right.svg";
                break;
        }

        

        this.instructions = {
            "MoveForward": function(params) {
                console.log('robot move forward');
                // params[0] is the distance
                for (var i = 0; i < params[0]; i++) {
                    switch (self.direction) {
                        case 'up':
                            table.moveObject(self, self.x, self.y - 1);
                            self.y--;
                            break;
                        case 'right':
                            table.moveObject(self, self.x + 1, self.y);
                            self.x++;
                            break;
                        case 'down':
                            table.moveObject(self, self.x, self.y + 1);
                            self.y++;
                            break;
                        case 'left':
                            table.moveObject(self, self.x - 1, self.y);
                            self.x--;
                            break;
                    }
                }
            },
            "Turn": function(params) {
                // params[0] is the direction
                self.$turn(params[0]);
            },
            "Busy": function() {
                return false;
            },
            "Talk": function(params) {
                // params[0] is the text
                var text = params[0];
                table.$broadcast('robot.talk', {
                    uttering: text
                });
                if ('speechSynthesis' in window) {
                    var utterance = new SpeechSynthesisUtterance(text);
                    window.speechSynthesis.speak(utterance);
                }
            },
            "FireLaser": function(params) {
                self.invoke("Talk", ["PEW PEW PEW"]);
                var beam;
                switch (self.direction) {
                    case 'up':
                        beam = table.spawnProjectile('Laser', self.x, self.y - 1, self.direction);
                        break;
                    case 'right':
                        beam = table.spawnProjectile('Laser', self.x + 1, self.y, self.direction);
                        break;
                    case 'down':
                        beam = table.spawnProjectile('Laser', self.x, self.y + 1, self.direction);
                        break;
                    case 'left':
                        beam = table.spawnProjectile('Laser', self.x - 1, self.y, self.direction);
                        break;
                }
            }
        };
    };

    Robot.prototype = {};

    Robot.prototype.invoke = function(functionName, params) {
        var op = this.instructions[functionName];
        if (!op) {
            throw "Unknown method: " + functionName;
        }
        return op(params);
    }

    Robot.prototype.render = function(element) {
        // stick yourself in the DOM
    }

    Robot.prototype.destroy = function() {
        // clean up
    }

    Robot.prototype.$turn = function(turningDirection) {
        if (turningDirection == 'right') {
            switch (this.direction) {
                case 'up':
                    this.direction = 'right';
                    this.image = "images/robot/robot-right.svg";
                    break;
                case 'right':
                    this.direction = 'down';
                    this.image = "images/robot/robot-down.svg";
                    break;
                case 'down':
                    this.direction = 'left';
                    this.image = "images/robot/robot-left.svg";
                    break;
                case 'left':
                    this.direction = 'up';
                    this.image = "images/robot/robot-up.svg";
                    break;
            }
        } else {
            switch (this.direction) {
                case 'up':
                    this.direction = 'left';
                    this.image = "images/robot/robot-left.svg";
                    break;
                case 'right':
                    this.direction = 'up';
                    this.image = "images/robot/robot-up.svg";
                    break;
                case 'down':
                    this.direction = 'right';
                    this.image = "images/robot/robot-right.svg";
                    break;
                case 'left':
                    this.direction = 'down';
                    this.image = "images/robot/robot-down.svg";
                    break;
            }
        }
    }

    objectFactory.registerObject('Robot', Robot);
})
