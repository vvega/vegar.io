/**
* Enemy class.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {Object} opts - Any options to be applied
*/
Enemy = function(game, opts) {
	Consumer.call(this, game, opts);
}
Enemy.prototype = Object.create(Consumer.prototype);
Enemy.prototype.AIState = {
	FLEE : 1,
	ROAM : 2,
	HUNT : 3
};

/**
* Move entity away from target entity.
* @param {GameObject} entity - entity to flee from
*/
Enemy.prototype.fleeFrom = function(entity) {
	var currentX = this.body.x;
	var currentY = this.body.y;
	this.body.velocity.x = entity.body.x < currentX ? config.ENEMY_SPEED : -config.ENEMY_SPEED;
	this.body.velocity.y = entity.body.y < currentY ? config.ENEMY_SPEED : -config.ENEMY_SPEED;
};

/**
* Move entity toward target entity.
* @param {GameObject} entity - entity to chase
*/
Enemy.prototype.hunt = function(entity) {
	var currentX = this.body.x;
	var currentY = this.body.y;
	this.body.velocity.x = entity.body.x < currentX ? -config.ENEMY_SPEED : config.ENEMY_SPEED;
	this.body.velocity.y = entity.body.y < currentY ? -config.ENEMY_SPEED : config.ENEMY_SPEED;
};

Enemy.prototype.roam = function(destination) {
	//TODO: Set move to random destination points while state is set to ROAM
};

/** Update enemy positioning. */
Enemy.prototype.update = function() {
	if(Phaser.Math.distance(this.game.player.x, this.game.player.y, this.x, this.y) <= this.width + config.FLEE_DISTANCE) { 
		if(this.game.player.mass >= this.mass) {
			this.fleeFrom(this.game.player);
		} else {
			this.hunt(this.game.player);
		}
	}
};