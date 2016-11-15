var Game = (function(){
	// This class is becoming progressively less useful
	// I think its coordinating functions are mostly handled
	// by the Mediator.
	// Keeping it for now in case it becomes relevant again.

	// cache DOM
	
	// bind events
	Mediator.on('render', render);

	// Draw the resource totals
	function render() {
	}

	Mediator.emit('render');

})();
