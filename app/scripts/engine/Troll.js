var Troll = function(attrs, getAtLocation, angularScope) {
    GridObject.apply(this, [attrs]);
    
	// Troll image
    var rockReady = false;
    var rockImage = new Image();
    rockImage.onload = function () {
        rockReady = true;
    };
    rockImage.src = "images/objects/troll.png";
    this.restrictive = true;
    this.goal = false;

    var self = this;
    this.image = rockImage;

    angularScope.$on('robot.talk', function(e, params) {
        if (params.uttering == "secret") {
            self.destroy();
        }
    });
};

Troll.prototype = Object.create(GridObject.prototype);

Troll.prototype.render = function(canvasSize, squareSize, ctx) {
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

Troll.prototype.destroy = function() {
    this.destroyed = true;
}

Troll.prototype.update = function(canvasSize, squareSize, ctx) {
	// no op
}