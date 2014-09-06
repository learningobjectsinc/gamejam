var Game = function(map, objects) {
    this.map = map;

    this.objects = objects;

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
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasSive.width, canvasSive.height);

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
        if ((object.getX() === x) && (object.getY() === y)) {
            return object;
        }
    };
    return null;
}
