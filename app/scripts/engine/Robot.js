var Robot = function(x,y) {

    // Robot image
    var rbReady = false;
    var rbImage = new Image();
    rbImage.onload = function () {
        rbReady = true;
    };
    rbImage.src = "images/robot/robot-down.svg";//resources/robot.bmp";

	var self = this;
    this.x = x;
    this.y = y;
    this.direction = 'right';
    this.image = rbImage;
    this.busy = false;

    this.moving = false;
    this.movingDistance = 0;
    // pixels/second
    this.speed = 20;

    this.turning = false;
    this.turningDirection = 'right';

    this.instructions = {
    	"moveForward": function(params) {
    		// params[0] is the distance
            self.moving = true;
            self.movingDistance = params[0];
            self.busy = true;
    	},
    	"turn": function(params) {
    		// params[0] is the direction
            self.turning = true;
            self.turningDirection = params[0];
    	}
    };

};

Robot.prototype.doSomething = function(functionName, params) {
    this.instructions[functionName](params);
}

Robot.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.restore();
}

Robot.prototype.update = function(time) {
    if (this.moving) {
        this.$moveForward(time);
    }
    if (this.turning) {
        this.$turn();
    }
}

Robot.prototype.isBusy = function() {
    return this.busy;
}

Robot.prototype.$moveForward = function(time) {
    if (this.movingDistance > 0) {
        var modifier = this.speed * time;
        if(modifier > this.movingDistance){
            modifier = this.movingDistance;
            this.movingDistance = 0;
        } else {
            this.movingDistance -= modifier;
        }
        switch (this.direction){
            case 'right':
                this.x += modifier;
                break;
            case 'left':
                this.x -= modifier;
                break;
            case 'up':
                this.y -= modifier;
                break;
            case 'down':
                this.y += modifier;
                break;
        }
    } else {
        this.moving = false;
        this.movingDistance = 0;
        this.busy = false;
    }
}

Robot.prototype.$turn = function() {
    if (this.turningDirection == 'right') {
        switch(this.direction)     {
            case 'up':
                this.direction = 'right';
                break;
            case 'right':
                this.direction = 'down';
                break;
            case 'down':
                this.direction = 'left';
                break;
            case 'left':
                this.direction = 'up';
                break;
        }
    } else {
        switch(this.direction)     {
            case 'up':
                this.direction = 'left';
                break;
            case 'right':
                this.direction = 'up';
                break;
            case 'down':
                this.direction = 'right';
                break;
            case 'left':
                this.direction = 'down';
                break;
        }
    }
    this.turning = false;
}

// RobotIO
/*
function RobotIO() {
    IO.call(this);
}

RobotIO.prototype = Object.create(IO.prototype);

RobotIO.prototype.constructor = RobotIO;

RobotIO.prototype.interrupt = function(code, parameters) {
    Robot.doSomething(code, parameters);
}
*/
