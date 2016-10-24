var Game = (function(){

	var deck = Deck.create({size: 20});
	var resources = {
		white: 0,
		blue: 0,
		red: 0,
		black: 0,
		green: 0,
	};
	var time_left = 10; // number of draws remaining

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
	Mediator.on('drawRequest', checkTime);
	Mediator.on('costCheck', checkCost);
	Mediator.on('addTime', addTime);

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

	function addTime(time) {
		time_left += time;
		Mediator.emit('render');
	}

	function checkTime(event) {
		if (time_left > 0) {
			Mediator.emit(event);
		}
	}

	function checkCost(payload) {
		cost = payload.cost;
		callback = payload.callback;
		parsed_cost = {
			white: 0,
			black: 0,
			red: 0,
			green: 0,
			blue: 0,
		}
		for (var i=0; i<cost.length; i++) {
			if (cost[i] == 'U') {
				parsed_cost.blue += 1;
			}
			else if (cost[i] == 'W') {
				parsed_cost.white += 1;
			}
			else if (cost[i] == 'B') {
				parsed_cost.black += 1;
			}
			else if (cost[i] == 'G') {
				parsed_cost.green += 1;
			}
			else if (cost[i] == 'R') {
				parsed_cost.red += 1;
			}
		}
		
		// Check parsed cost to see that we have enough
		can_pay = true;
		Object.keys(resources).forEach(function(key) {
			if (resources[key] < parsed_cost[key]) {
				can_pay = false;
			}
		});
		
		if (can_pay) {
			// Subtract the resource cost and callback for the effect
			Object.keys(parsed_cost).forEach(function(key) {
				resources[key] -= parsed_cost[key];
			});
			callback();
		}
	}

	Mediator.emit('render');

})();
