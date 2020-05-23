import shuffle from "lodash/shuffle";

// How many cards we need to match together, ie
// pairs, tripples, etc
const NUMBER_PER_MATCH = 2;

export function createInitalState(numberOfCards) {
  const cards = [];

  // Add pairs of cards to the state
  for (let i = 0; i < numberOfCards; i++) {
    cards.push({
      id: i,
      type: i % (numberOfCards / NUMBER_PER_MATCH),
      // When a card is 'flipped' it's part of the current play selection
      flipped: false,
      // When a card is matched, its full set has been found and its out of play
      matched: false,
    });
  }

  return {
    cards: shuffle(cards),
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return createInitalState(action.numberOfCards);
    case "FLIP_CARD":
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.id ? { ...card, flipped: true } : { ...card }
        ),
      };
    case "CHECK_BOARD":
      const flippedCards = state.cards.filter((card) => card.flipped);
      const isMatchingSet = flippedCards.every(
        (card, i, cards) => card.type === cards[0].type
      );

      if (!isMatchingSet) {
        // if any of the flipped cards do not have matching types, unflip all cards
        return {
          ...state,
          cards: state.cards.map((card) => ({ ...card, flipped: false })),
        };
      } else if (flippedCards.length === NUMBER_PER_MATCH) {
        // otherise, if we are the last card in the set, mark all as matched
        return {
          ...state,
          cards: state.cards.map((card) =>
            card.type === flippedCards[0].type
              ? { ...card, matched: true, flipped: false }
              : { ...card }
          ),
        };
      }

    default:
      return state;
  }
}
