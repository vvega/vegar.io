/**
* Base GameObject class.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {Object} opts - Any options to be applied
*/
GameObject = function(game, opts) {
	Phaser.Sprite.call(this, game, opts.x, opts.y, opts.image);

	Object.assign(this, opts);

	if(!opts.mass) {
		this.setMass(config.BASE_MASS);
	} else {
		this.setMass(opts.mass);
	}

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.anchor.setTo(0.5, 0.5);
	this.body.drag = this.dragPoint;

	game.add.existing(this);
};
GameObject.prototype = Object.create(Phaser.Sprite.prototype);
GameObject.prototype.dragPoint = new Phaser.Point(config.DRAG, config.DRAG);

/** 'Kill' this object. */
GameObject.prototype.getConsumed = function() {
	this.kill();
};

/** Respawn if the game is active. */
GameObject.prototype.revive = function() {
	if(!this.game.physics.arcade.isPaused) {
		Phaser.Sprite.prototype.revive.call(this);
	}
};

/** 
* Set mass property & size of this object. 
* @param {int} mass
*/
GameObject.prototype.setMass = function(mass) {
	this.mass = mass;
	this.width = this.mass;
	this.height = this.mass;
};