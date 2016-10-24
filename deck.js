var Deck = {
	size: 0,
	decklist: [], // All cards in the deck, regardless of state (in deck, in hand, drawn, discarded, etc)
	deckstate: [], // All remaining cards in the deck, in shuffled order
	faceupCard: -1, // Cards are tracked by a number representing the card id

	create: function(values) {
		var instance = Object.create(this);
		Object.keys(values).forEach(function(key) {
			instance[key] = values[key];
		});
		instance.init();
		return instance;
	},
	init: function() {
		this.cacheDom();
		this.bindEvents();

		this.fillDeck();
		this.shuffleDeck();
	},
	cacheDom: function() {
		this.$el = $("#deck-module");
		this.$deck = this.$el.find('#deck');
		this.$faceup = this.$el.find('#faceup');

		this.decktemplate = this.$deck.find('#deck-template').html();;
	},
	bindEvents: function() {
		// Bind DOM events
		this.$deck.on('click', this.drawCard.bind(this));

		// Bind Mediator events
		Mediator.on('render', this.render.bind(this));
	},

	render: function() {
		// Render the deck
		this.$deck.html( Mustache.render(this.decktemplate, {decksize: this.deckstate.length}) );
		
		// Only render the faceup card if there is one
		if (this.faceupCard != -1) {
			cardname = cards.getCard(this.faceupCard).name;
			this.$faceup.text(cardname);
		}
	},

	// gives a number between [min] and [max-1] inclusive
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	fillDeck: function() {
		this.decklist = [];
		for (var i=0; i < this.size; i++) {
			this.decklist.push( this.getRandomInt(0, cards.max_id) );
		}
		this.deckstate = this.decklist.slice(0); // clone the decklist to the deckstate
	},

	shuffleDeck: function() {
		var counter = this.deckstate.length;

		while (counter > 0) {
			var i = Math.floor(Math.random() * counter);

			counter--;

			var temp = this.deckstate[counter];
			this.deckstate[counter] = this.deckstate[i];
			this.deckstate[i] = temp;
		}
	},

	drawCard: function() {
		// shift() is the same as pop() but removes from the front of the list
		var card = this.deckstate.shift();
		if (card !== undefined) {
			this.faceupCard = card;
		}
		Mediator.emit('render');
	},
};
