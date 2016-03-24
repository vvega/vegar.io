/**
* Pause menu class.
* @param {message} (optional) - message to display on the menu
* @param {msgStyle} (optional) - override message style properties
*/
var Menu = function(game, message, msgStyle) {

	this.game = game;
	this.game.pause();

	Phaser.Sprite.call(this, game, config.CANVAS_WIDTH/2, config.CANVAS_HEIGHT/2, 'menu');
	this.height = config.MENU_HEIGHT;
	this.width = config.MENU_WIDTH;
	this.anchor.setTo(0.5,0.5);

	game.add.existing(this);

	this.logo = game.add.sprite(config.CANVAS_WIDTH/2, config.CANVAS_HEIGHT/2, 'logo');
	this.logo.width = this.width/2;
	this.logo.height = this.height/5;
	this.logo.anchor.setTo(0.5,1.75);

	if(message) {
		var style = Object.assign({ 
			font: "bold 32px Arial",
			fill: "#67c24b",
			boundsAlignH: "center",
			boundsAlignV: "middle" 
		}, msgStyle);
		this.text = game.add.text(this.logo.x, this.logo.y, message, style);
		this.text.anchor.setTo(0.5,0.5);
		this.text.fixedToCamera = true;
	}

	this.button = game.add.button(this.logo.x, this.logo.y + this.height/4, 'button', game.resume, this, 2, 1, 0);
	this.button.width = this.width/3;
	this.button.height = this.height/4;
	this.button.anchor.setTo(0.5, 0.5);


	this.fixedToCamera = true;
	this.logo.fixedToCamera = true;
	this.button.fixedToCamera = true;
};
Menu.prototype = Object.create(Phaser.Sprite.prototype);