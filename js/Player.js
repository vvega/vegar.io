Player = function(game, opts) {
	Consumer.call(this, game, opts);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON);
}
Player.prototype = Object.create(Consumer.prototype);
Player.prototype.getConsumed = function() {
	Consumer.prototype.getConsumed.call(this);
	console.log("YOU LOSE");
};