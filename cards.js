var cards = (function() {

	// Bind events
	// Handle card drawing logic
	Mediator.on('drewCard', drewCard)

	// Base card class
	var Card = {
		name: 'cardname',
		cost: 0,

		create: function(values) {
			var instance = Object.create(this);
			Object.keys(values).forEach( function(key) {
				instance[key] = values[key];
			});
			return instance;
		},

		onDraw: function() {
		},
	}

	// Individual card types
	
	// Resources
	var Land = Card.create({ // ABSTRACT - do not instantiate
		onDraw: function() {
			Mediator.emit('drewResource', this.name);
		}
	});
	var plains = Land.create({
		name: 'Plains',
	});
	var swamp = Land.create({
		name: 'Swamp',
	});
	var island = Land.create({
		name: 'Island',
	});
	var mountain = Land.create({
		name: 'Mountain',
	});
	var forest = Land.create({
		name: 'Forest',
	});

	// Draw Effects
	var tap = Card.create({
		name: 'Tap',
		onDraw: function() {
			Mediator.emit('tap');
		}
	});

	// Creatures
	var rabidSquirrel = Card.create({
		name: 'Rabid Squirrel',
		cost: 'RR',
		onDraw: function() {
			Mediator.emit('addToHand', 6);
		}
	});

	var card_list = {
		0: plains,
		1: swamp,
		2: island,
		3: mountain,
		4: forest,
		5: tap,
		6: rabidSquirrel,
	}

	function getCard(id) {
		return card_list[id];
	}

	function drewCard(id) {
		getCard(id).onDraw();
	}

	return {
		max_id: Object.keys(card_list).length-1,
		land_min_id: 0,
		land_max_id: 4,
		getCard: getCard,
	}

})();
