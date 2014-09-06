var Robot = function(x,y) {
    GridObject.apply(this, [x, y]);
    
    // Robot image
    var rbReady = false;
    var rbImage = new Image();
    rbImage.onload = function () {
        rbReady = true;
    };
    rbImage.src = "images/robot/robot-right.svg";

	var self = this;
    this.x = x;
    this.y = y;
    this.direction = 'right';
    this.image = rbImage;
    this.busy = false;

    this.moving = false;
    this.movingDistance = 0;
    this.totalMovingDistance = 0;
    // pixels/second
    this.speed = 20;

    this.turning = false;
    this.turningDirection = 'right';

    this.colliding = false;

    this.instructions = {
    	"moveForward": function(params) {
    		// params[0] is the distance
            self.moving = true;
            self.totalMovingDistance = params[0];
            self.movingDistance = 1;
            self.busy = true;
    	},
    	"turn": function(params) {
    		// params[0] is the direction
            self.turning = true;
            self.turningDirection = params[0];
    	}
    };

};

Robot.prototype = Object.create(GridObject.prototype);

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

    ctx.restore();
}

Robot.prototype.update = function(time) {
    if (this.moving) {
        this.$moveForward(time);
    }
    if (this.turning) {
        this.$turn();
    }
    if (this.colliding) {
        this.$collide();
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
        this.totalMovingDistance--;
        if (this.totalMovingDistance === 0) {
            this.moving = false;
            this.movingDistance = 0;
            this.busy = false;   
        } else {
            console.log(this.x, this.y);
            if (this.x === 7 && this.y === 5) { //TODO real collision
                this.moving = false;
                this.colliding = true;
            } else {
                this.movingDistance = 1;
            }
        }
    }
}

Robot.prototype.$collide = function() {
    if (this.totalMovingDistance > 0) {
        this.totalMovingDistance--;
        console.log('ouch');
        //TODO noise;
    } else {
        this.colliding = false;
        this.busy = false;
    }
}

Robot.prototype.$turn = function() {
    if (this.turningDirection == 'right') {
        switch(this.direction)     {
            case 'up':
                this.direction = 'right';
                this.image.src = "images/robot/robot-right.svg";
                break;
            case 'right':
                this.direction = 'down';
                this.image.src = "images/robot/robot-down.svg";
                break;
            case 'down':
                this.direction = 'left';
                this.image.src = "images/robot/robot-left.svg";
                break;
            case 'left':
                this.direction = 'up';
                this.image.src = "images/robot/robot-up.svg";
                break;
        }
    } else {
        switch(this.direction)     {
            case 'up':
                this.direction = 'left';
                this.image.src = "images/robot/robot-left.svg";
                break;
            case 'right':
                this.direction = 'up';
                this.image.src = "images/robot/robot-up.svg";
                break;
            case 'down':
                this.direction = 'right';
                this.image.src = "images/robot/robot-right.svg";
                break;
            case 'left':
                this.direction = 'down';
                this.image.src = "images/robot/robot-down.svg";
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
