var Game = (function(){

	var deck = Deck.create({size: 20});

	// cache DOM
	
	// bind events
	Mediator.on('render', render);

	// Draw the resource totals
	function render() {
	}

	Mediator.emit('render');

})();
