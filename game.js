var Game = (function(){

	var deck = Deck.create({size: 20});
	var time_left = 10; // number of draws remaining

	// cache DOM
	$time = $('#time');
	time_template = $time.find('#time-ticks').html();
	
	// bind events
	Mediator.on('render', render);
	Mediator.on('drewCard', passTime);
	Mediator.on('drawRequest', checkTime);
	Mediator.on('addTime', addTime);

	// Draw the resource totals
	function render() {
		ticks = new Array(time_left);
		$time.html( Mustache.render(time_template, {ticks: ticks}) );
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

	Mediator.emit('render');

})();
