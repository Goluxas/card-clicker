var logger = (function() {

	var statement_num = 0;

	// Cache DOM
	
	// Bind events
	Mediator.on('log', log);

	function log(message) {
		console.log(statement_num + ': ' + message);
		statement_num += 1;
	}

})();
