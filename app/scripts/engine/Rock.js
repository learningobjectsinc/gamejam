var Rock = function(x,y) {
	// Rock image
    var rockReady = false;
    var rockImage = new Image();
    rockImage.onload = function () {
        rockReady = true;
    };
    rockImage.src = "images/objects/rock.png";

    var self = this;
    this.x = x;
    this.y = y;
    this.image = rockImage;
};

Rock.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.restore();
}

Rock.prototype.update = function(canvasSize, squareSize, ctx) {
	// no op
}