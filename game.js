var Game = (function(){

	var deck = Deck.create({size: 10});
	var resources = {
		white: 0,
		blue: 0,
		red: 0,
		black: 0,
		green: 0,
	};
	
	Mediator.on('drewResource', addResource);

	function addResource(color) {
		resources[color] += 1;
		Mediator.emit('render');
	}

	Mediator.emit('render');

})();
