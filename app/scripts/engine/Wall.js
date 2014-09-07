var Wall = function(attrs) {
    GridObject.apply(this, [attrs]);
    
    // Wall image
    var wallReady = false;
    var wallImage = new Image();
    wallImage.onload = function () {
        wallReady = true;
    };
    wallImage.src = "images/objects/wall.png";
    this.restrictive = true;
    this.goal = false;

    var self = this;
    this.image = wallImage;
};

Wall.prototype = Object.create(GridObject.prototype);

Wall.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.restore();
}

Wall.prototype.update = function(canvasSize, squareSize, ctx) {
    // no op
}