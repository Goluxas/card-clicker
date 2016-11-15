// Handles the deck, shuffling, drawing cards, displaying faceup card
var deck = (function() {

	var size = 20;
	var decklist = []; // All cards in the deck, regardless of state (in deck, in hand, drawn, discarded, etc)
	var deckstate = []; // All remaining cards in the deck, in shuffled order
	var faceupCard = -1; // Cards are tracked by a number representing the card id

	var TO_PREPARE = 10; // number of cards to keep in the nextcards list
	var nextcards = [];

	// Cache DOM
	$el = $("#deck-module");
	$deck = $el.find('#deck');
	$faceup = $el.find('#faceup');

	decktemplate = $deck.find('#deck-template').html();;

	// Bind Events
	// Bind DOM events
	Mediator.bind($deck, 'click', 'drawCard');

	// Bind Mediator events
	Mediator.on('render', render);
	Mediator.on('drawCard', drawCard);
	Mediator.on('addCards', addCards);

	prepareCards();

	function render() {
		// Render the deck
		$deck.html( Mustache.render(decktemplate, {}) );
		
		// Only render the faceup card if there is one
		if (faceupCard != -1) {
			cardname = cards.getCard(faceupCard).name;
			$faceup.text(cardname);
		}
	}

	// gives a number between [min] and [max-1] inclusive
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function prepareCards() {
		nextcards = [];
		for (var i=0; i < TO_PREPARE; i++) {
			var attempts = 0;
			// avoid putting in the same card twice, but let it slide if we've tried 3 times
			do {
				next = getRandomInt(0, cards.max_id+1);
				attempts += 1;
			} while ($.inArray(next, nextcards) && attempts < 3);
			nextcards.push( next );
		}
	}

	// deprecated
	function fillDeck() {
		decklist = [];
		for (var i=0; i < size; i++) {
			decklist.push( getRandomInt(0, cards.max_id+1) );
		}
		deckstate = decklist.slice(0); // clone the decklist to the deckstate
	}

	// deprecated
	function shuffleDeck() {
		var counter = deckstate.length;

		while (counter > 0) {
			var i = Math.floor(Math.random() * counter);

			counter--;

			var temp = deckstate[counter];
			deckstate[counter] = deckstate[i];
			deckstate[i] = temp;
		}
	}

	function drawCard() {
		// shift() is the same as pop() but removes from the front of the list
		var card = nextcards.shift();
		faceupCard = card;
		Mediator.emit('drewCard', faceupCard);
		
		// if we've drawn the last of the prepared cards, prepare some new ones
		if (nextcards.length == 0) {
			prepareCards();
		}

		Mediator.emit('render');
	}

	function addCards(new_cards) {
		deckstate = deckstate.concat(new_cards);
		shuffleDeck();
		Mediator.emit('render');
	}

})();
