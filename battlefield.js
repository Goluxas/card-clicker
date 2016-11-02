var battlefield = (function() {

	var army = [];
	var encounter = '';

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

	function render() {
		// render army
		army_display = [];
		army.forEach(function(id) {
			var c = cards.getCard(id);
			army_display.push( {name: c.name, attack: c.attack, hp: c.hp} );
		});
		$army_list.html( Mustache.render( army_template, {creature: army_display} ) );

		// render encounter, if any
		if (encounter !== '') {
			$encounter.html( Mustache.render( encounter_template, {encounter: encounter} ) );
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

})();
