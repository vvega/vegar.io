window.onload = function() {

	var RESISTANCE = config.RESISTANCE; 
	var PLAYER_SPEED = config.PLAYER_SPEED;
	var ENEMY_SPEED = config.ENEMY_SPEED;
	var FLEE_DISTANCE = config.FLEE_DISTANCE;

	var game = new Phaser.Game(config.CANVAS_WIDTH, config.CANVAS_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	function preload() {
		game.load.image('bg', 'assets/images/bg.png');
		game.load.image('player', 'assets/images/player.png');
		game.load.image('enemy', 'assets/images/enemy.png');
		game.load.image('menu', 'assets/images/menu.png');
		game.load.image('logo', 'assets/images/logo.png');
		game.load.image('button', 'assets/images/button.png');
		for(var foodName in config.ASSETS.images.food) {
	    	game.load.image(foodName, config.ASSETS.images.food[foodName]);
		}
	}

	function create() {
		game.world.setBounds(0, 0, config.GAME_WIDTH, config.GAME_HEIGHT);

	   	bg = game.add.tileSprite(0, 0, 100, 100, 'bg');
	   	bg.tileScale.x = .8;
	   	bg.tileScale.y = .8;
	   	bg.width = game.world.width;
	   	bg.height = game.world.height;

	    game.player = new Player(game, {image: 'player', x: game.world.centerX, y: game.world.centerY});
	   	game.enemies = new EnemyGroup(game, 15);
	   	game.food = new FoodGroup(game, 8);
	   	game.player.anchor.setTo(0,.5); 

	    game.consumables = game.add.group();

	    game.consumables.add(game.enemies);
	    game.consumables.add(game.food);
	    game.consumables.add(game.player);
	   	game.menu = new Menu(game);

	    game.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	    game.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	    game.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	    game.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

	    game.ended = false;		
	}

	function update() {
		game.physics.arcade.overlap(game.consumables.children, game.consumables.children, handleCollision);

		if(game.wKey.isDown) { game.player.body.velocity.y = -PLAYER_SPEED; }
		if(game.aKey.isDown) { game.player.body.velocity.x = -PLAYER_SPEED; }
		if(game.sKey.isDown) { game.player.body.velocity.y = PLAYER_SPEED; }
		if(game.dKey.isDown) { game.player.body.velocity.x = PLAYER_SPEED; }

		//TODO: Rotation/animation?
		game.enemies.updateAll();
	}

	function handleCollision(collider, target) {
		if(target.mass < collider.mass && collider instanceof Consumer) {
			collider.consume(target);
		} else if (target.mass > collider.mass && target instanceof Consumer) {
			target.consume(collider);
		}
	}

	game.pause = function() {
		game.physics.arcade.isPaused = true;
	}

	game.resume = function() {
		game.physics.arcade.isPaused = false;
		if(game.menu) {
			game.menu.logo.destroy();
			game.menu.button.destroy();
			game.menu.text && game.menu.text.destroy()
			game.menu.destroy();
		}
		if(game.ended) {
			game.restart();
			game.ended = false;
		}
	}

	game.lose = function() {
		game.ended = true;
		game.menu = new Menu(game, 'YOU LOSE!', {fill:"#d33131"});
	}

	game.win = function() {
		game.ended = true;
		game.menu = new Menu(game, 'You win, I guess..', {fill:"#67c24b"});
	}

	game.restart = function() {
		game.player.reset();
		game.enemies.respawn();
		game.food.respawn();
	}

	function render() {
	    //game.debug.spriteInfo(game.player, 32, 32);
	}
}
