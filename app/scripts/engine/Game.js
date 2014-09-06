var Game = function(map, objects) {
    this.map = map;

    this.objects = objects;
}


Game.prototype.render = function(canvasSive, ctx) {
    //figure out the width of each square
    var squareWidth = canvasSive.width/this.map.width;
    var squareHeight = canvasSive.height/this.map.height;
    var squareSize = {
        width:squareWidth,
        height:squareHeight
    }

    //draw the background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasSive.width, canvasSive.height);

    //strokeRect(x, y, width, height)


    //draw the squares
    for(var x=0; x<this.map.width; x++){
        for(var y=0; y<this.map.height; y++){
            ctx.strokeRect(x*squareWidth, y*squareHeight, squareWidth, squareHeight);
        }
    }

    for(var i=0; i<this.objects.length; i++ ){
        robot.render(canvasSive, squareSize, ctx);
    }
    
};


