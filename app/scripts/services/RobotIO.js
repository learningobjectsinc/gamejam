// RobotIO
angular.module('gamejamApp').factory('RobotIO', [function(){

    this.setRobot = function(robot){
        this.robot = robot;
    }

    this.getRobot = function(){
        return this.robot;
    }

    this.interrupt = function(code, parameters) {
        var x = this.robot.invoke(code, parameters);
        return x;
    }

    return this;
}]);

