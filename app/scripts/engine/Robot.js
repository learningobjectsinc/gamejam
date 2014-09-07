var Robot = function(x, y, getAtLocation, angularScope) {
    GridObject.apply(this, [x, y]);
    
    // Robot image
    var rbReady = false;
    var rbImage = new Image();
    rbImage.onload = function () {
        rbReady = true;
    };
    rbImage.src = "images/robot/robot-right.svg";
    
    // Speach image
    var sReady = false;
    var sImage = new Image();
    sImage.onload = function () {
        sReady = true;
    };
    sImage.src = "images/robot/speech_bubble.png";

	var self = this;
    this.angularScope = angularScope
    this.x = x;
    this.y = y;
    this.getAtLocation = getAtLocation
    this.direction = 'right';
    this.image = rbImage;
    this.speechImage = sImage;
    this.busy = false;
    this.winning = false;

    this.talking = false;
    this.talkingText = '';
    this.talkingDuration = 0;
    this.talkingTotalDuration = 3;

    this.moving = false;
    this.movingDistance = 0;
    this.totalMovingDistance = 0;
    this.speed = 20; // pixels/second

    this.turning = false;
    this.turningDirection = 'right';

    this.colliding = false;

    this.batterySize = 15;
    this.batteryPower = this.batterySize;

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
    	},
        "talk": function(params) {
            // params[0] is the text
            self.talking = true;
            self.talkingText = params[0];
            self.talkingDuration = self.talkingTotalDuration;
            if ('speechSynthesis' in window) {
                var utterance = new SpeechSynthesisUtterance(self.talkingText);
                window.speechSynthesis.speak(utterance);
            }
        },
        "busy": function(params) {
            return self.moving || self.turning || self.talking;
        }
    };

    angularScope.$on('processor.step', function() {
        self.drainBattery();
    })

};

Robot.prototype = Object.create(GridObject.prototype);

Robot.prototype.invoke = function(functionName, params) {
    return this.instructions[functionName](params);
}

Robot.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);
    if (this.talking) {
        ctx.drawImage(this.speechImage, squareSize.width/4, squareSize.height*-1.1, squareSize.width*2, squareSize.height*0.8);
        ctx.font = '400 16px courier';
        ctx.fillStyle = "black";
        ctx.fillText(this.talkingText, squareSize.width*0.4, squareSize.height*-0.8);
    }

    ctx.restore();

    ctx.fillStyle = '#090';

    if (this.batteryPower > 0) {
        var padding = 5;
        var segmentWidth = (canvasSize.width / this.batterySize) - padding;
        for (var i = 0; i < this.batteryPower; i++) {
            ctx.fillRect(i * (segmentWidth + padding) + padding / 2, canvasSize.height - 35, segmentWidth, 30);
        }
    }
    
    ctx.fill();

    ctx.restore();
}

Robot.prototype.update = function(time) {
    if (this.winning) {
        this.angularScope.$broadcast('win');
    }
    if (this.moving) {
        this.$moveForward(time);
    }
    if (this.turning) {
        this.$turn();
    }
    if (this.colliding) {
        this.$collide();
    }
    if (this.talking) {
        this.$talk(time);
    }
}

Robot.prototype.isBusy = function() {
    return this.busy;
}

Robot.prototype.drainBattery = function(amount) {
    var amount = amount || 1;
    this.batteryPower -= amount;

    if (this.batteryPower == 0) {
        this.invoke("talk", ["Powering down"]);
    }

    return this.batteryPower;
}

Robot.prototype.$talk = function(time) {
    if (this.talkingDuration > 0) {
        this.talkingDuration -= time; 
    } else {
        this.talking = false;
    }
}

Robot.prototype.$moveForward = function(time) {
    var inFront = this.$getInFront();
    if (inFront != null && inFront.restrictive) { //TODO real collision
        this.$cleanMyPosition();
        this.moving = false;
        this.colliding = true;
    } else {
        if (inFront != null && inFront.goal) {
            this.winning = true;
        }
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
            this.$cleanMyPosition();
            this.totalMovingDistance--;
            if (this.totalMovingDistance === 0) {
                this.moving = false;
                this.movingDistance = 0;
                this.busy = false;   
            } else {
                this.movingDistance = 1;
            }
        }
    }
}

Robot.prototype.$getInFront = function() {
    switch (this.direction){
        case 'right':
            return this.getAtLocation(this.x + 1, this.y);
            break;
        case 'left':
            return this.getAtLocation(this.x - 1, this.y);
            break;
        case 'up':
            return this.getAtLocation(this.x, this.y - 1);
            break;
        case 'down':
            return this.getAtLocation(this.x, this.y + 1);
            break;
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

Robot.prototype.$cleanMyPosition = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
}

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
}

