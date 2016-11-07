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

	// Encounters
	var Encounter = Card.create({ // ABSTRACT - do not instantiate
		onDraw: function() {
			Mediator.emit('setEncounter', this.encounter);
		},
	});

	var mountainLion = Encounter.create({
		id: 7,
		name: 'Mountain Lion',
		encounter: {
			name: 'Mountain Lion',
			description: {
				condition: '2/2',
				reward: 'Gain 1 Mountain, Tap all Mountains',
				penalty: 'Lose half of pooled Red Mana',
			},
			time_left: 5,
			engage: function(army) {
				// How the hell does this work?
				var str = 2;
				var hp = 2;
				
				army.forEach( function(creature) {
					// If the Encounter hasn't already been defeated
					if (hp > 0) {
						// Encounter deals damage to the creature
						var diff = str - creature.hp;
						// if the encounter has greater or equal strength than the creature's hp
						if (diff >= 0) {
							str -= creature.hp;
							creature.hp = 0; // will be cleaned up by the army management in battlefield.js
						}
						// if the encounter has less strength than the creature's hp
						else {
							creature.hp -= str; // creature takes persistent damage
							str = 0; // all Encounter's strength is consumed
						}

						// Encounter takes damage from the creature
						hp -= creature.attack;
					}
				});

				if (hp <= 0) {
					this.onSuccess();
				} else {
					this.onFailure();
				}
			},
			onSuccess: function() {
				Mediator.emit('addResource', 'mountain');
				Mediator.emit('tap', 'mountains');
			},
			onFailure: function() {
				Mediator.emit('removeResource', {type: 'red', value: 'half'});
			},
		},
	});

	var card_list = {
		0: plains,
		1: swamp,
		2: island,
		3: mountain,
		4: forest,
		5: tap,
		6: rabidSquirrel,
		7: mountainLion,
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
		//max_id: Object.keys(card_list).length-1,
		max_id: 6,
		land_min_id: 0,
		land_max_id: 4,
		getCard: getCard,
	}

})();
