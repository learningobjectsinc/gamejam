var Robot = function(x,y) {

    // Robot image
    var rbReady = false;
    var rbImage = new Image();
    rbImage.onload = function () {
        rbReady = true;
    };
    rbImage.src = "images/robot/robot-complete.svg";//resources/robot.bmp";

	var self = this;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.image = rbImage;
    this.busy = false;

    this.moving = false;
    this.movingDistance = 0;
    // pixels/second
    this.speed = 20;

    this.turning = false;
    this.turnedDistance = 0;
    // radians/second
    this.turnSpeed = 5;

    this.instructions = {
    	"moveForward": function(params) {
    		// params[0] is the distance
            self.moving = true;
            self.movingDistance = params[0];
            self.busy = true;
    	},
    	"turn": function(params) {
    		// params[0] is the new angle
            self.turning = true;
            self.turnedDistance = params[0];
    	}
    };
};

Robot.prototype.doSomething = function(functionName, params) {
    this.instructions[functionName](params);
}

Robot.prototype.render = function(ctx) {
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, -this.image.width/2, -this.image.height/2);
    ctx.restore();      
}

Robot.prototype.update = function(time) {
    if (this.moving) {
        this.$moveForward(time);
    }
    if (this.turning) {
        this.$turn(time);
    }
}

Robot.prototype.isBusy = function() {
    return this.busy;
}

Robot.prototype.$moveForward = function(time) {
    if (this.movingDistance > 0) {
        var modifier = this.speed * time;
        this.movingDistance -= modifier;
        this.x+= Math.cos(this.angle) * modifier;
        this.y+= Math.sin(this.angle) * modifier;
    } else {
        this.moving = false;
        this.movingDistance = 0;
        this.busy = false;
    }
}

Robot.prototype.$turn = function(time) {
    if (this.turnedDistance > 0) {
        var modifier = this.turnSpeed * time;
        this.turnedDistance -= modifier;
        this.angle += modifier;
    } else {
        this.turning = false;
        this.turnedDistance = 0;
        this.busy = false;
    }
}