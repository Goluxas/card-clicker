var cards = (function() {

	// Bind events
	// Handle card drawing logic
	Mediator.on('drewCard', drewCard)
	Mediator.on('castCard', castCard)

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
		id: 0,
		name: 'Plains',
	});
	var swamp = Land.create({
		id: 1,
		name: 'Swamp',
	});
	var island = Land.create({
		id: 2,
		name: 'Island',
	});
	var mountain = Land.create({
		id: 3,
		name: 'Mountain',
	});
	var forest = Land.create({
		id: 4,
		name: 'Forest',
	});

	// Draw Effects
	var tap = Card.create({
		id: 5,
		name: 'Tap',
		onDraw: function() {
			Mediator.emit('tap');
		}
	});

	// Creatures
	var Creature = Card.create({ // ABSTRACT - do not instantiate
		onDraw: function() {
			Mediator.emit('addToHand', this.id);
		},
		onCast: function() {
			Mediator.emit('removeFromHand', this.id);
			Mediator.emit('addToArmy', this.id);
			Mediator.emit('render');
		}
	});

	var rabidSquirrel = Creature.create({
		id: 6,
		name: 'Rabid Squirrel',
		cost: 'RR',
		attack: 1,
		hp: 1,
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

	function castCard(id) {
		getCard(id).onCast();
	}

	return {
		max_id: Object.keys(card_list).length-1,
		land_min_id: 0,
		land_max_id: 4,
		getCard: getCard,
	}

})();
