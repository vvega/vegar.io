Enemy = function(game, opts) {
	Consumer.call(this, game, opts);
}
Enemy.prototype = Object.create(Consumer.prototype);
Enemy.prototype.fleeFrom = function(entity) {
	var currentX = this.body.x;
	var currentY = this.body.y;
	this.body.velocity.x = entity.body.x < currentX ? config.ENEMY_SPEED : -config.ENEMY_SPEED;
	this.body.velocity.y = entity.body.y < currentY ? config.ENEMY_SPEED : -config.ENEMY_SPEED;
}
Enemy.prototype.hunt = function() {
	//TODO
}
Enemy.prototype.roam = function(destination) {
	//TODO
}
Enemy.prototype.update = function() {
	if(Phaser.Math.distance(this.game.player.x, this.game.player.y, this.x, this.y) <= config.FLEE_DISTANCE 
		&& (this.game.player.mass > this.mass)) {
			this.fleeFrom(this.game.player);
	}
}