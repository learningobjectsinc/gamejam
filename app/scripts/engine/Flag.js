var Flag = function(x,y) {
    GridObject.apply(this, [x, y]);
    
    // Flag image
    var FlagReady = false;
    var FlagImage = new Image();
    FlagImage.onload = function () {
        FlagReady = true;
    };
    FlagImage.src = "images/objects/flag.png";

    var self = this;
    this.x = x;
    this.y = y;
    this.image = FlagImage;
};

Flag.prototype = Object.create(GridObject.prototype);

Flag.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.restore();
}

Flag.prototype.update = function(canvasSize, squareSize, ctx) {
    // no op
}