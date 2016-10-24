var cantrips = (function() {

	// Base spell class
	var Spell = {
		name: 'spell name',
		cost: 0,
		
		create: function(values) {
			var instance = Object.create(this);
			Object.keys(values).forEach(function(key) {
				instance[key] = values[key];
			});
			instance.init();
			return instance;
		},

		init: function() {
			this.cacheDom();
			this.bindEvents();
		},
		cacheDom: function() {
			$spells = $('#spells');
			$list = $spells.find('ul');
		},
		bindEvents: function() {
		},

		effect: function() {},
	}

	var rewind_time = Spell.create({
		name: 'Rewind Time',
		cost: 'U',
		bindEvents: function() {
			$button = $spells.find('#rewind-time');
			Mediator.bind($button, 'click', 'costCheck', {cost: this.cost, callback: this.effect});
		},
		effect: function() {
			Mediator.emit('addTime', 3);
		},
	});

	var rampant_growth = Spell.create({
		name: 'Rampant Growth',
		cost: 'G',
		bindEvents: function() {
			$button = $spells.find('#rampant-growth');
			Mediator.bind($button, 'click', 'costCheck', {cost: this.cost, callback: this.effect});
		},
		effect: function() {
			// Adds 3 random lands to the deck
			var new_cards = [];
			for (var i=0; i<3; i++) {
				new_cards.push( Math.floor( Math.random() * (cards.land_max_id + 1 - cards.land_min_id) ) + cards.land_min_id );
			}
			Mediator.emit('addCards', new_cards);
		},
	});

})();
