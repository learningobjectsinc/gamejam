var Owl = function(x,y) {
	// Owl image
    var owlReady = false;
    var owlImage = new Image();
    owlImage.onload = function () {
        owlReady = true;
    };
    owlImage.src = "images/objects/owl.png";

    var self = this;
    this.x = x;
    this.y = y;
    this.image = owlImage;
};

Owl.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.restore();
}

Owl.prototype.update = function(canvasSize, squareSize, ctx) {
	// no op
}
