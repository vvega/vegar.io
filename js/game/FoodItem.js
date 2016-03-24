/**
* FoodItem class.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {Object} opts - Any options to be applied
*/
FoodItem = function(game, opts) {
	GameObject.call(this, game, opts);
};
FoodItem.prototype = Object.create(GameObject.prototype);

/**
* Consumes this food item and applies a respawn timer.
* @param {Phaser.Game} game - Phaser game instance
* @param {Object} opts - Any options to be applied
*/
FoodItem.prototype.getConsumed = function() {
	GameObject.prototype.getConsumed.call(this);
	this.game.time.events.add(Phaser.Timer.SECOND * config.RESPAWN_SECONDS, this.revive, this);
};

/**
* Respawns this item with a random mass less
* than or equal to player mass (but at minimum, half).
*/
FoodItem.prototype.revive = function() {
	this.setMass((Math.random() * config.BASE_MASS) + config.BASE_MASS/2);
	GameObject.prototype.revive.call(this);
};