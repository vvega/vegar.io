window.onload = function() {
	var game = new Phaser.Game(config.CANVAS_WIDTH, config.CANVAS_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	function preload() {
	    game.load.image('phaser', 'assets/phaser.png');
	    game.load.image('landscape', 'assets/landscape.png');
	}

	var player;
	var enemies;
	var consumables;
	var mass;
	var wKey;
    var aKey;
    var sKey;
    var dKey;

	var RESISTANCE = config.RESISTANCE; 
	var PLAYER_SPEED = config.PLAYER_SPEED;
	var ENEMY_SPEED = config.ENEMY_SPEED;
	var FLEE_DISTANCE = config.FLEE_DISTANCE;

	function create() {
		game.world.setBounds(0, 0, config.GAME_WIDTH, config.GAME_HEIGHT);
	   	
	   	bg = game.add.sprite(0, 0, 'landscape');
	   	bg.width = game.world.width;
	   	bg.height = game.world.height;

	    game.player = new Player(game, {image: 'phaser', x: config.GAME_WIDTH/4, y: config.GAME_HEIGHT/4});
	   	enemies = new EnemyGroup(game, 10);
	   	console.log(enemies);

	    consumables = game.add.group();
	    consumables.add(enemies);
	    consumables.add(new FoodGroup(game, 10));

	    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);   		
	}

	function update() {
		game.physics.arcade.overlap(game.player, consumables.children, handlePlayerCollision);

		if(wKey.isDown) { game.player.body.velocity.y = -PLAYER_SPEED; }
		if(aKey.isDown) { game.player.body.velocity.x = -PLAYER_SPEED; }
		if(sKey.isDown) { game.player.body.velocity.y = PLAYER_SPEED; }
		if(dKey.isDown) { game.player.body.velocity.x = PLAYER_SPEED; }

		enemies.updateAll();
	}

	function handlePlayerCollision(collider, target) {
		if(target.mass < collider.mass) {
			collider.consume(target);
		} else if (target.mass > collider.mass && target instanceof Enemy) {
			target.consume(collider);
		}
	}

	function render() {
	    game.debug.spriteInfo(game.player, 32, 32);
	}
}