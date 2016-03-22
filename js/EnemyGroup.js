var EnemyGroup = function(game, amount) {
	Phaser.Group.call(this, game, null, 'enemies', true, true, Phaser.Physics.ARCADE);
	if(amount) {
		this.spawn(amount);
	}
};
EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.spawn = function(amount) {
	var mass, x, y;

	for(i = 0; i < amount; i++) {
		mass = Math.random()*config.BASE_MASS + config.BASE_MASS/4;
		x = Math.random()*config.GAME_WIDTH;
		y = Math.random()*config.GAME_HEIGHT;

		this.add(new Enemy(this.game, {x: x, y: y, mass: mass, image: 'phaser'}));
	}
};
EnemyGroup.prototype.updateAll = function() {
	for(idx in this.children) {
		this.children[idx].update();
	}
};