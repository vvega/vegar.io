GameObject = function(game, opts) {
	Phaser.Sprite.call(this, game, opts.x, opts.y, opts.image);

	Object.assign(this, opts);

	if(!this.mass) {
		this.mass = config.BASE_MASS;
	}

	this.updateSizeFromMass();
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.anchor.setTo(0.5, 0.5);
	this.body.drag = this.dragPoint;

	game.add.existing(this);
}
GameObject.prototype = Object.create(Phaser.Sprite.prototype);
GameObject.prototype.dragPoint = new Phaser.Point(config.DRAG, config.DRAG);
GameObject.prototype.updateSizeFromMass = function() {
	this.width = this.mass;
	this.height = this.mass;
}
GameObject.prototype.getConsumed = function() {
	this.kill();
}