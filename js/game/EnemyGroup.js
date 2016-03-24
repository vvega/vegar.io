/**
* Enemy group class.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {int} amount - amount of enemies to spawn
*/
var EnemyGroup = function(game, amount) {
	Phaser.Group.call(this, game, null, 'enemies', true, true, Phaser.Physics.ARCADE);
	if(amount) {
		this.spawn(amount);
	}
	this.game = game;
};
EnemyGroup.prototype = Object.create(Phaser.Group.prototype);

EnemyGroup.prototype._getRandomPosition = function(mass) {
	if(this.game.player) {
		var x = Math.random() > .5 
			? this.game.player.x + Math.random()*(config.GAME_WIDTH - this.game.player.x - mass) + config.FLEE_DISTANCE
			: this.game.player.x - (Math.random()*(this.game.player.x) + mass) - config.FLEE_DISTANCE;
		var y = Math.random() > .5 
			? this.game.player.y + Math.random()*(config.GAME_HEIGHT - this.game.player.y - mass) + config.FLEE_DISTANCE
			: this.game.player.y - (Math.random()*(this.game.player.y) + mass) - config.FLEE_DISTANCE;
		return { x: x, y: y };
	} else {
		return { x: Math.random()*config.GAME_WIDTH, y: Math.random()*config.GAME_HEIGHT };
	}
};

EnemyGroup.prototype._getRandomMass = function() {
	return Math.random()*(config.BASE_MASS*2) + config.BASE_MASS;
};

/**
* Add specified amount of enemy objects to this group.
* @param {int} amount - amount of enemies to spawn
*/
EnemyGroup.prototype.spawn = function(amount) {
	var mass, randomPos;

	for(i = 0; i < amount; i++) {
		mass = this._getRandomMass();
		randomPos = this._getRandomPosition(mass);

		this.add(new Enemy(this.game, {x: randomPos.x, y: randomPos.y, mass: mass, image: 'enemy'}));
	}
};

/** Update all enemies. */
EnemyGroup.prototype.updateAll = function() {
	for(idx in this.children) {
		this.children[idx].update();
	}
};

/** 
* Returns flag representing whether all children of this group are 
* marked as dead.
* @return {int}
**/
EnemyGroup.prototype.allDead = function() {
	var states = this.children.map(function(enemy) { return enemy.alive; });
	return states.indexOf(true) > -1 ? false : true;
};

/** Resets and revives children. */
EnemyGroup.prototype.respawn = function() {
	var randomPos;
	for(var idx in this.children) {
		this.children[idx].setMass(this._getRandomMass());

		randomPos = this._getRandomPosition(this.children[idx].mass);
		this.children[idx].x = randomPos.x;
		this.children[idx].y = randomPos.y;
		this.children[idx].body.velocity.x = 0;
		this.children[idx].body.velocity.y = 0;
		this.children[idx].revive();
	}
};