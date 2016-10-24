var Game = (function(){

	var deck = Deck.create({size: 10});
	var resources = {
		white: 0,
		blue: 0,
		red: 0,
		black: 0,
		green: 0,
	};

	// cache DOM
	$resources = $('#resources');
	$mana_list = $resources.find('ul');
	mana_template = $resources.find('#mana-template').html();
	
	Mediator.on('render', render);
	Mediator.on('drewResource', addResource);

	// Draw the resource totals
	function render() {
		mana = []
		Object.keys(resources).forEach(function(key) {
			if (resources[key] > 0) {
				mana.push({color: key, total: resources[key]});
			}
		});
		$mana_list.html( Mustache.render(mana_template, {mana}) );
	}

	function addResource(color) {
		resources[color] += 1;
		Mediator.emit('render');
	}

	Mediator.emit('render');

})();
