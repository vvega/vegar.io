Consumer = function(game, opts) {
	GameObject.call(this, game, opts);
}
Consumer.prototype = Object.create(GameObject.prototype);
Consumer.prototype.consume = function(target) {
	this.mass += target.mass;
	target.getConsumed();
	this.updateSizeFromMass();
}