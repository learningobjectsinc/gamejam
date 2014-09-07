// RobotIO
angular.module('gamejamApp').service('RobotIO', [function(){

    this.setRobot = function(robot){
        this.robot = robot;
    }

    this.getRobot = function(){
        return this.robot;
    }

    this.interrupt = function(code, parameters) {
        return this.robot.invoke(code, parameters);
    }
}]);

