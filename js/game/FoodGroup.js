/**
* Food group class.
* @constructor
* @param {Phaser.Game} game - Phaser game instance
* @param {int} amount - amount of food items to spawn
*/
var FoodGroup = function(game, amount) {
	Phaser.Group.call(this, game, null, 'food', true, true, Phaser.Physics.ARCADE);
	if(amount) {
		this.spawn(amount);
	}
	this.game = game;
};
FoodGroup.prototype = Object.create(Phaser.Group.prototype);

/**
* Add specified amount of food objects to this group.
* @param {int} amount - amount of food items to spawn
*/
FoodGroup.prototype.spawn = function(amount) {
	var mass, x, y, image;
	var foodImages = Object.keys(config.ASSETS.images.food);

	for(i = 0; i < amount; i++) {
		mass = Math.random() * config.BASE_MASS + config.BASE_MASS/4;
		x = Math.random()*config.GAME_WIDTH;
		y = Math.random()*config.GAME_HEIGHT;
		image = foodImages[Math.floor(Math.random()*foodImages.length)];

		this.add(new FoodItem(this.game, {x: x, y: y, mass: mass, image: image}));
	}
};

/** Resets and revives children. */
FoodGroup.prototype.respawn = function() {
	for(var idx in this.children) {
		this.children[idx].setMass(Math.random() * config.BASE_MASS + config.BASE_MASS/4);
		this.children[idx].x = Math.random()*config.GAME_WIDTH;
		this.children[idx].y = Math.random()*config.GAME_HEIGHT;
		this.children[idx].revive();
	}
};