var battlefield = (function() {

	var active = [];

	// cache DOM
	$bf = $('#battlefield');
	$bf_list = $bf.find('ul');
	bf_template = $bf.find('#battlefield-template').html();

	// bind events
	Mediator.on('render', render);
	Mediator.on('addToBattlefield', addToBF);

	function render() {
		bf_display = [];
		active.forEach(function(id) {
			var c = cards.getCard(id);
			bf_display.push( {name: c.name, attack: c.attack, hp: c.hp} );
		});
		$bf_list.html( Mustache.render( bf_template, {creature: bf_display} ) );
	}

	function addToBF(id) {
		active.push(id);
		
		Mediator.emit('render');
	}

})();
