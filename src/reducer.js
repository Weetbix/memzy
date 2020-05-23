import shuffle from "lodash/shuffle";

// Creates the initial game state.
// @param {number} numberOfCards    The total desired number of cards on the board
// @param {number} cardsPerSet      The number of cards that must be matched together
//                                  ie. pairs, triples etc
export function createInitalState({ numberOfCards, cardsPerSet }) {
  const cards = [];

  // Add pairs of cards to the state
  for (let i = 0; i < numberOfCards; i++) {
    cards.push({
      id: i,
      type: i % (numberOfCards / cardsPerSet),
      // When a card is 'flipped' it's part of the current play selection
      flipped: false,
      // When a card is matched, its full set has been found and its out of play
      matched: false,
    });
  }

  return {
    // Our card items
    cards: shuffle(cards),
    // Whether or not we should respond to card flips
    interactive: true,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return createInitalState({
        numberOfCards: action.numberOfCards,
        cardsPerSet: action.cardsPerSet,
      });

    // Flips one card if the game state is interactive and disables interactive
    case "FLIP_CARD":
      return {
        ...state,
        // Disable card flipping until the board has been checked with CHECK_BOARD
        interactive: false,
        cards: state.cards.map((card) =>
          card.id === action.id ? { ...card, flipped: true } : { ...card }
        ),
      };

    case "CHECK_BOARD":
      const newState = { ...state, interactive: true };

      const flippedCards = state.cards.filter((card) => card.flipped);
      const cardsDontMatch = !flippedCards.every(
        (card, i, cards) => card.type === cards[0].type
      );
      const allCardsInSetFlipped = state.cards
        .filter((card) => card.type === flippedCards[0].type)
        .every((card) => card.flipped);

      if (cardsDontMatch) {
        // if any of the flipped cards do not have matching types, unflip all cards
        return {
          ...newState,
          cards: state.cards.map((card) => ({ ...card, flipped: false })),
        };
      } else if (allCardsInSetFlipped) {
        // otherise, if all cards in the set are flipped, mark all as matched
        return {
          ...newState,
          cards: state.cards.map((card) =>
            card.type === flippedCards[0].type
              ? { ...card, matched: true, flipped: false }
              : { ...card }
          ),
        };
      }
      return newState;

    default:
      return state;
  }
}
