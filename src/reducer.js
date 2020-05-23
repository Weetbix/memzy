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
      // When a card is 'flipped' it's part of the current play selectionf
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
  console.log(state);
  switch (action.type) {
    case "RESET":
      return createInitalState(action.numberOfCards);
    case "FLIP_CARD": {
      const targetCard = state.cards.find((card) => card.id === action.id);

      if (!targetCard.flipped || targetCard.matched) {
        const isMatchingSet = state.cards
          .filter((card) => card.flipped)
          .every((card) => card.type === targetCard.type);

        if (isMatchingSet) {
          // it maches, see if we have any remaining cards to match
          const wasLastCardInSet =
            state.cards.filter(
              (card) => card.type === targetCard.type && card.flipped
            ).length +
              1 >=
            NUMBER_PER_MATCH;

          if (wasLastCardInSet) {
            console.log("was last");
            // Set all the cards of the set to matched
            return {
              ...state,
              cards: state.cards.map((card) =>
                card.type === targetCard.type
                  ? { ...card, matched: true }
                  : { ...card }
              ),
            };
          } else {
            // Otherise flip this individual card
            return {
              ...state,
              cards: state.cards.map((card) =>
                card.id === targetCard.id
                  ? { ...card, flipped: true }
                  : { ...card }
              ),
            };
          }
        } else {
          // It doesnt match, reset all the cards
          return {
            ...state,
            cards: state.cards.map((card) => ({ ...card, flipped: false })),
          };
        }
      }
    }
    default:
      return state;
  }
}
