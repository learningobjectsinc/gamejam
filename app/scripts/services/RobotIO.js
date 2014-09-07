// RobotIO
angular.module('gamejamApp').service('RobotIO', [function(){

    this.setRobot = function(robot){
        this.robot = robot;
    }

    this.getRobot = function(){
        return this.robot;
    }

    this.interrupt = function(code, parameters) {
        this.robot.doSomething(code, parameters);
    }

}]);

