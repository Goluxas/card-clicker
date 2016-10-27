var resources = (function() {
	var lands = {
		islands: 0,
		forests: 0,
		mountains: 0,
		plains: 0,
		swamps: 0
	};

	var mana = {
		blue: 0,
		green: 0,
		red: 0,
		white: 0,
		black: 0
	}

	// cache DOM
	$resources = $('#resources');
	$mana_list = $resources.find('ul');
	mana_template = $resources.find('#mana-template').html();
	
	// bind Events
	Mediator.on('render', render);
	Mediator.on('drewResource', addResource);
	Mediator.on('checkCost', checkCost);

	function render() {
		var mana_display = []
		Object.keys(mana).forEach(function(key) {
			if (mana[key] > 0) {
				mana_display.push({color: key, total: mana[key]});
			}
		});
		$mana_list.html( Mustache.render(mana_template, {mana: mana_display}) );
	}

	function addResource(color) {
		mana[color] += 1;
		Mediator.emit('render');
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
		Object.keys(mana).forEach(function(key) {
			if (mana[key] < parsed_cost[key]) {
				can_pay = false;
			}
		});
		
		if (can_pay) {
			// Subtract the resource cost and callback for the effect
			Object.keys(parsed_cost).forEach(function(key) {
				mana[key] -= parsed_cost[key];
			});
			callback();
		}
	}

})();
