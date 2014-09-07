var NullObject = function(x,y) {
    GridObject.apply(this, [x, y]);

    this.restrictive = true;
    this.goal = false;

    var self = this;
    this.x = x;
    this.y = y;
};

NullObject.prototype = Object.create(GridObject.prototype);

NullObject.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.fillStyle = '#DDD';
    ctx.fillRect(-squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);
    ctx.fill();

    ctx.restore();
}

NullObject.prototype.update = function(canvasSize, squareSize, ctx) {
	// no op
}