var Game = (function(){

	var deck = Deck.create({size: 10});
	var resources = {
		white: 0,
		blue: 0,
		red: 0,
		black: 0,
		green: 0,
	};
	var time_left = 3; // number of draws remaining

	// cache DOM
	$resources = $('#resources');
	$mana_list = $resources.find('ul');
	mana_template = $resources.find('#mana-template').html();

	$time = $('#time');
	time_template = $time.find('#time-ticks').html();
	
	// bind events
	Mediator.on('render', render);
	Mediator.on('drewResource', addResource);
	Mediator.on('drewCard', passTime);

	// Draw the resource totals
	function render() {
		var mana = []
		Object.keys(resources).forEach(function(key) {
			if (resources[key] > 0) {
				mana.push({color: key, total: resources[key]});
			}
		});
		$mana_list.html( Mustache.render(mana_template, {mana: mana}) );

		ticks = new Array(time_left);
		$time.html( Mustache.render(time_template, {ticks: ticks}) );
	}

	function addResource(color) {
		resources[color] += 1;
		Mediator.emit('render');
	}

	function passTime() {
		time_left--;
	}

	Mediator.emit('render');

})();
