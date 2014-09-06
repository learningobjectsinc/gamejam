var GridObject = function(x,y) {
    this.x = x;
    this.y = y;
};

GridObject.prototype.getX = function() {
	return this.x;
}

GridObject.prototype.getY = function() {
	return this.y;
}