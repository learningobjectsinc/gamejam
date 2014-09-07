var Rock = function(x,y) {
    GridObject.apply(this, [x, y]);
    
	// Rock image
    var rockReady = false;
    var rockImage = new Image();
    rockImage.onload = function () {
        rockReady = true;
    };
    rockImage.src = "images/objects/wall.png";
    this.restrictive = true;
    this.goal = false;

    var self = this;
    this.x = x;
    this.y = y;
    this.image = rockImage;
};

Rock.prototype = Object.create(GridObject.prototype);

Rock.prototype.render = function(canvasSize, squareSize, ctx) {
    if (this.destroyed) {
        return false;
    }
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.restore();
}

Rock.prototype.destroy = function() {
    this.destroyed = true;
}

Rock.prototype.update = function(canvasSize, squareSize, ctx) {
	// no op
}