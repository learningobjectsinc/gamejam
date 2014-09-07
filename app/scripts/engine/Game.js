window.robots = [];

var Game = function(map, angularScope, RobotIO) {

    var self = this;

    this.map = map;
    this.angularScope = angularScope;

    this.objects = [];

    this.debugMode = false;

    this.bottomBarHeight = 40;

    // Game bg image
    var bgImage = new Image();
    bgImage.onload = function() {
        
    };
    bgImage.src = "images/backgroundTile.png";
    this.bgImage = bgImage;

    var getAtLocation = function(x, y) {
        for (var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            if ((object.x === x) && (object.y === y)) {
                return object;
            }
        };
        return null;
    }

    _.each(map.objects, function(object) {
        // forgive me
        var instance = new window[object.type](object.x, object.y, getAtLocation, angularScope);
        self.objects.push(instance);
        //forgive me some more
        if(object.type === 'Robot'){
            RobotIO.setRobot(instance);
        }
    });

    this.getSquareSizes = function(canvasSize){
        //figure out the width of each square
        var squareWidth = canvasSize.width/this.map.width;
        var squareHeight = (canvasSize.height - this.bottomBarHeight) /this.map.height;
        return {
            width:squareWidth,
            height:squareHeight
        };
    }

    window.addEventListener("keydown", function(e){
        if(e.keyCode === 81){
            self.debugMode = !self.debugMode;
        }
    }, true);
}

Game.prototype.render = function(canvasSize, ctx) {
    var squareSize = this.getSquareSizes(canvasSize);

    //draw the background
    var ptrn = ctx.createPattern(this.bgImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height - this.bottomBarHeight); // context.fillRect(x, y, width, height);

    ctx.fillStyle = '#111';
    ctx.fillRect(0, canvasSize.height - this.bottomBarHeight, canvasSize.width, this.bottomBarHeight);
    ctx.fill();

    //draw the squares
    // ctx.strokeStyle = '#CCC';
    // for(var x=0; x<this.map.width; x++){
    //     for(var y=0; y<this.map.height; y++){
    //         ctx.strokeRect(x*squareSize.width, y*squareSize.height, squareSize.width, squareSize.height);
    //     }
    // }

    for(var i=0; i<this.objects.length; i++ ){
        this.objects[i].render(canvasSize, squareSize, ctx);
    }

    if(this.debugMode){
        //draw the coordinates
        for(var x=0; x<this.map.width; x++){
            for(var y=0; y<this.map.height; y++){
                ctx.fillStyle = "blue";
                ctx.fillText((x + 1) + ", " + (y + 1), x*squareSize.width + 5, y*squareSize.height + 15);
            }
        }
    }
    
};


Game.prototype.update = function(canvasSize, ctx) {
    //figure out the width of each square
    var squareSize = this.getSquareSizes(canvasSize);

    for(var i=0; i<this.objects.length; i++ ){
        this.objects[i].update(canvasSize, squareSize, ctx);
    }
    
};


Game.prototype.getAtLocation = function(x, y) {
    for (var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
        if ((object.x === x) && (object.y === y)) {
            return object;
        }
    };
    return null;
}
