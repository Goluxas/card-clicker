var hand = (function() {

	hand_cards = [];

	// cache DOM
	$hand = $('#hand');
	$hand_list = $hand.find('ul');
	hand_template = $hand.find('#hand-template').html();
	
	// bind events
	Mediator.on('render', render);
	Mediator.on('addToHand', addToHand);

	function render() {
		var card_display = [];
		hand_cards.forEach(function(id) {
			var c = cards.getCard(id);
			card_display.push( {name: c.name, cost: c.cost} );
		});
		$hand_list.html( Mustache.render( hand_template, {card: card_display} ) );
	}

	function addToHand(id) {
		hand_cards.push(id);
		Mediator.emit('render');
	}

})();
