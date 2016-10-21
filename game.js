var deck = {
	init: function() {
		this.fillDeck();
		this.faceupCard = 'blank';

		this.cacheDom();
		this.bindEvents();
		this.render();
	},
	cacheDom: function() {
		this.$el = $("#deck-module");
		this.$deck = this.$el.find('#deck');
		this.$faceup = this.$el.find('#faceup');

		this.decktemplate = this.$deck.find('#deck-template').html();;
	},
	bindEvents: function() {
		this.$deck.on('click', this.drawCard.bind(this));
	},
	render: function() {
		this.$deck.html( Mustache.render(this.decktemplate, {decksize: this.deck.length}) );
		this.$faceup.text( this.faceupCard );
	},

	// private helpers
	fillDeck: function() {
		this.deck = ['plains', 'mountain', 'island']
	},

	// exposed api
	drawCard: function() {
		// shift() is the same as pop() but removes from the front of the list
		var card = this.deck.shift();
		if (card !== undefined) {
			this.faceupCard = card;
		}
		this.render();
	},
};

var card = {
	name: '',
	onDraw: function() {},
};

var game = {
	init: function() {
		this.deck = deck;

		this.deck.init();
	},
};

game.init();
