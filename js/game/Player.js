/**
* Player class.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {Object} opts - Any options to be applied
*/
Player = function(game, opts) {
	Consumer.call(this, game, opts);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON);
	this.game = game;
}
Player.prototype = Object.create(Consumer.prototype);

/** Get consumed and end the game. */
Player.prototype.getConsumed = function() {
	Consumer.prototype.getConsumed.call(this);
	this.game.lose();
};

/** Consume and check for a win. */
Player.prototype.consume = function(target) {
	Consumer.prototype.consume.call(this, target);
	if(target instanceof Enemy && this.game.enemies.allDead()) {
		this.game.win();
	}
};

/** Resets and revives player. */
Player.prototype.reset = function() {
	this.x = this.game.world.centerX;
	this.y = this.game.world.centerY;
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.setMass(config.BASE_MASS);
	this.revive();
};