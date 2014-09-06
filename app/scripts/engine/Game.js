window.robots = [];
var Game = function(map) {
    this.map = map;
    var self = this;

    this.objects = [];

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
        var instance = new window[object.type](object.x, object.y, getAtLocation);
        self.objects.push(instance);
        //forgive me some more
        if(object.type === 'Robot'){
            robots.push(instance);
        }
    });

    this.getSquareSizes = function(canvasSive){
        //figure out the width of each square
        var squareWidth = canvasSive.width/this.map.width;
        var squareHeight = canvasSive.height/this.map.height;
        return {
            width:squareWidth,
            height:squareHeight
        };
    }
}

Game.prototype.render = function(canvasSive, ctx) {
    var squareSize = this.getSquareSizes(canvasSive);

    //draw the background
    var ptrn = ctx.createPattern(this.bgImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, canvasSive.width, canvasSive.height); // context.fillRect(x, y, width, height);

    //draw the squares
    for(var x=0; x<this.map.width; x++){
        for(var y=0; y<this.map.height; y++){
            ctx.strokeRect(x*squareSize.width, y*squareSize.height, squareSize.width, squareSize.height);
        }
    }

    for(var i=0; i<this.objects.length; i++ ){
        this.objects[i].render(canvasSive, squareSize, ctx);
    }
    
};


Game.prototype.update = function(canvasSive, ctx) {
    //figure out the width of each square
    var squareSize = this.getSquareSizes(canvasSive);

    for(var i=0; i<this.objects.length; i++ ){
        this.objects[i].update(canvasSive, squareSize, ctx);
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
