/* This event mediator receives and forwards events
 * among the various Card Clicker modules. Events are
 * emitted by certain actions and then trigger a cascade
 * response.
 *
 * Events currently in use:
 * Event Name - Payload - Description
 * drewCard - card ID - triggers onDraw effects
 * drewResource - color - adds that color to resource totals
 * render - n/a - tells all modules to render their data
 */
var Mediator = {
	events: {},
	on: function(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},
	emit: function(eventName, data) {
		if (this.events[eventName]) {
			this.events[eventName].forEach(function(fn) {
				fn(data);
			});
		}
	}
};
