var battlefield = (function() {

	var army = [];
	/* Encounter, when set, will be an object with the following keys:
	 * name: 		Encounter Name
	 * condition: 	The goal in order to beat the encounter
	 * 				(For monster encounters, this is their attack/hp)
	 * time_left:	The amount of time remaining to meet the condition
	 * reward:		The reward if the encounter is successful
	 * penalty:		The penalty if the encounter is failed
	 */
	var encounter = null;

	// cache DOM
	$bf = $('#battlefield');
	// encounter section
	$encounter = $bf.find('div');
	encounter_template = $bf.find('#encounter-template').html();
	// army section
	$army_list = $bf.find('ul');
	army_template = $bf.find('#army-template').html();

	// bind events
	Mediator.on('render', render);
	Mediator.on('addToArmy', addToArmy);
	Mediator.on('setEncounter', setEncounter);
	Mediator.on('drewCard', passTime);

	function render() {
		// render army
		army_display = [];
		army.forEach(function(id) {
			var c = cards.getCard(id);
			army_display.push( {name: c.name, attack: c.attack, hp: c.hp} );
		});
		$army_list.html( Mustache.render( army_template, {creature: army_display} ) );

		// render encounter, if any
		if (encounter !== null) {
			ticks = new Array(encounter.time_left);
			$encounter.html( Mustache.render( encounter_template, {enc: encounter, ticks: ticks} ) );
		} else {
			$encounter.html('');
		}
	}

	function addToArmy(id) {
		army.push(id);
		
		Mediator.emit('render');
	}

	function setEncounter(enc) {
		encounter = enc;

		Mediator.emit('render');
	}

	function passTime() {
		if (encounter !== null) {
			encounter.time_left -= 1;

			if (encounter.time_left == 0) {
				// TODO - execute the condition and see what happens
				// for now, just null the encounter
				encounter = null;
			}

			Mediator.emit('render');
		}
	}

})();
