FoodItem = function(game, opts) {
	//assign random images here
	GameObject.call(this, game, opts);
}
FoodItem.prototype = Object.create(GameObject.prototype);