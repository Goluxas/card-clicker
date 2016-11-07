var resources = (function() {
	var lands = {
		blue: 0,
		green: 0,
		red: 0,
		white: 0,
		black: 0
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
	$mana_list = $resources.find('#mana-reserves');
	mana_template = $resources.find('#mana-template').html();
	$land_list = $resources.find('#lands');
	land_template = $resources.find('#land-template').html();
	
	// bind Events
	Mediator.on('render', render);
	Mediator.on('drewResource', drewResource);
	Mediator.on('addResource', addResource);
	Mediator.on('removeResource', removeResource);
	Mediator.on('checkCost', checkCost);
	Mediator.on('tap', tap);

	function render() {
		var mana_display = []
		Object.keys(mana).forEach(function(key) {
			if (mana[key] > 0) {
				mana_display.push({color: key, total: mana[key]});
			}
		});
		$mana_list.html( Mustache.render(mana_template, {mana: mana_display}) );

		var land_display = []
		Object.keys(lands).forEach(function(key) {
			if (lands[key] > 0) {
				land_display.push({name: key, count: lands[key]});
			}
		});
		$land_list.html( Mustache.render(land_template, {land: land_display}) );
	}

	function drewResource(res) {
		var color = '';

		if (res == 'Island') {
			color = 'blue';
		} else if (res == 'Mountain') {
			color = 'red';
		} else if (res == 'Forest') {
			color = 'green';
		} else if (res == 'Plains') {
			color = 'white';
		} else if (res == 'Swamp') {
			color = 'black';
		}

		lands[color] += 1;
		mana[color] += 1;

		Mediator.emit('render');
	}

	function addResource(res) {
		if (res == 'mountain') {
			lands['red'] += 1;
		}

		Mediator.emit('render');
	}

	function removeResource(res) {
		var operation = null;

		if (res.value == 'half') {
			operation = function(val) {
				return Math.floor(val / 2);
			}
		}

		if (res.type == 'red') {
			mana['red'] = operation(mana['red']);
		}

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

	function tap(res) {
		// if nothing is specified, tap everything
		if (res == null) {
			Object.keys(lands).forEach(function(key) {
				mana[key] += lands[key];
			});
		} else if (res == 'mountains') {
			mana['red'] += lands['red'];
		}

		Mediator.emit('render');
	}

})();
