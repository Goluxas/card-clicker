var cards = (function() {

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
	var plains = Card.create({
		name: 'Plains',
		onDraw: function() {
			Mediator.emit('drewResource', 'white');
		}
	});
	var swamp = Card.create({
		name: 'Swamp',
		onDraw: function() {
			Mediator.emit('drewResource', 'black');
		}
	});
	var island = Card.create({
		name: 'Island',
		onDraw: function() {
			Mediator.emit('drewResource', 'blue');
		}
	});
	var mountain = Card.create({
		name: 'Mountain',
		onDraw: function() {
			Mediator.emit('drewResource', 'red');
		}
	});
	var forest = Card.create({
		name: 'Forest',
		onDraw: function() {
			Mediator.emit('drewResource', 'green');
		}
	});

	var cards = {
		0: plains,
		1: swamp,
		2: island,
		3: mountain,
		4: forest,
	}

	function getCard(id) {
		return cards[id];
	}

	// Handle card drawing logic
	Mediator.on('drewCard', drewCard)
	function drewCard(id) {
		getCard(id).onDraw();
	}

	return {
		max_id: 4,
		getCard: getCard,
	}

})();
