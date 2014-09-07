var Goal = function(attrs) {
    GridObject.apply(this, [attrs]);
    
    // Goal image
    var GoalReady = false;
    var GoalImage = new Image();
    GoalImage.onload = function () {
        GoalReady = true;
    };
    GoalImage.src = "images/objects/goal.gif";
    this.restrictive = false;
    this.goal = true;

    var self = this;
    this.image = GoalImage;
};

Goal.prototype = Object.create(GridObject.prototype);

Goal.prototype.render = function(canvasSize, squareSize, ctx) {
    ctx.save();
    ctx.translate(
        this.x*squareSize.width - squareSize.width/2,
        this.y*squareSize.height - squareSize.height/2
    );

    ctx.drawImage(this.image, -squareSize.width/2, -squareSize.width/2, squareSize.width, squareSize.height);

    ctx.restore();
}

Goal.prototype.update = function(canvasSize, squareSize, ctx) {
    // no op
}