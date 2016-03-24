/**
* Base class for game objects that can consume other objects.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {Object} opts - Any options to be applied
*/
Consumer = function(game, opts) {
	GameObject.call(this, game, opts);
};
Consumer.prototype = Object.create(GameObject.prototype);

/**
* Consumes another GameObject entity and absorbs its mass.
* @param {GameObject} target - entity to consume.
*/
Consumer.prototype.consume = function(target) {
	this.setMass(this.mass + target.mass);
	target.getConsumed();
};