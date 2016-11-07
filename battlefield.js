var battlefield = (function() {

	var army = [];
	/* Encounter, when set, will be an object with the following keys:
	 * name: 		Encounter Name
	 * description: An object with strings describing the encounter.
	 * 				The following are its keys
	 * 		condition: 	The goal in order to beat the encounter
	 * 				(For monster encounters, this is their attack/hp)
	 * 		reward:		The reward if the encounter is successful
	 * 		penalty:		The penalty if the encounter is failed
	 * time_left:	The amount of time remaining to meet the condition
	 * engage:		A function to determine whether or not the encounter
	 * 				was successful, and execute the reward/penalty.
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
		cleanupArmy();
		$army_list.html( Mustache.render( army_template, {creature: army} ) );

		// render encounter, if any
		if (encounter !== null) {
			ticks = new Array(encounter.time_left);
			$encounter.html( Mustache.render( encounter_template, {enc: encounter, ticks: ticks} ) );
		} else {
			$encounter.html('');
		}
	}

	function addToArmy(id) {

		var c = cards.getCard(id);
		var creature = {
			name: c.name,
			attack: c.attack,
			hp: c.hp,
		}

		army.push(creature);
		
		Mediator.emit('render');
	}

	function cleanupArmy() {
		function isAlive(creature) {
			return creature.hp > 0;
		}

		army = army.filter(isAlive);
	}

	function setEncounter(enc) {
		encounter = enc;

		Mediator.emit('render');
	}

	function passTime() {
		if (encounter !== null) {
			encounter.time_left -= 1;

			if (encounter.time_left == 0) {
				encounter.engage(army);
				encounter = null;
			}

			Mediator.emit('render');
		}
	}

})();
