import { reducer, createInitalState } from "../reducer";

describe("create initial state", () => {
  describe("input errors", () => {
    it("should throw an error if number of cards is not atleast 2", () => {
      expect(() =>
        createInitalState({ numberOfCards: 0, cardsPerSet: 2 })
      ).toThrow();
      expect(() =>
        createInitalState({ numberOfCards: -1, cardsPerSet: 2 })
      ).toThrow();
      expect(() =>
        createInitalState({ numberOfCards: 1, cardsPerSet: 2 })
      ).toThrow();
    });

    it("should not throw an error if number of cards is atleast 2", () => {
      expect(() =>
        createInitalState({ numberOfCards: 2, cardsPerSet: 2 })
      ).not.toThrow();
    });

    it("should throw an error if more images were requested than we have in the project", () => {
      expect(() =>
        createInitalState({ numberOfCards: 200, cardsPerSet: 2 })
      ).toThrow();
    });

    it("should throw an error if the number of cards in a set is not evenly divisble into the total card number", () => {
      expect(() =>
        createInitalState({ numberOfCards: 10, cardsPerSet: 3 })
      ).toThrow();
      expect(() =>
        createInitalState({ numberOfCards: 10, cardsPerSet: 4 })
      ).toThrow();
      expect(() =>
        createInitalState({ numberOfCards: 10, cardsPerSet: 6 })
      ).toThrow();
    });

    it("should not throw an error when the number of cards in a set is divisible into the total cards", () => {
      expect(() =>
        createInitalState({ numberOfCards: 6, cardsPerSet: 3 })
      ).not.toThrow();
      expect(() =>
        createInitalState({ numberOfCards: 12, cardsPerSet: 4 })
      ).not.toThrow();
    });
  });

  it("should start with all cards not flipped", () => {
    const state = createInitalState({ numberOfCards: 4, cardsPerSet: 2 });
    expect(state.cards.every((card) => !card.flipped)).toBeTruthy();
  });

  it("should start with all cards not matched", () => {
    const state = createInitalState({ numberOfCards: 4, cardsPerSet: 2 });
    expect(state.cards.every((card) => !card.matched)).toBeTruthy();
  });

  it("should end up with the correct number of cards", () => {
    const state = createInitalState({ numberOfCards: 6, cardsPerSet: 2 });
    expect(state.cards.length).toBe(6);
  });

  it("should end up with the correct number of differen types of cards", () => {
    let state = createInitalState({ numberOfCards: 6, cardsPerSet: 2 });
    expect(new Set(state.cards.map((card) => card.type)).size).toBe(3);

    state = createInitalState({ numberOfCards: 6, cardsPerSet: 3 });
    expect(new Set(state.cards.map((card) => card.type)).size).toBe(2);
  });
});

describe("reducer", () => {
  let MOCK_STATE;
  beforeEach(() => {
    // Mock data for a 2x2 with 2 types of cards
    MOCK_STATE = {
      interactive: true,
      cards: [
        {
          id: 0,
          type: 1,
          flipped: false,
          matched: false,
        },
        {
          id: 1,
          type: 1,
          flipped: false,
          matched: false,
        },
        {
          id: 2,
          type: 2,
          flipped: false,
          matched: false,
        },
        {
          id: 3,
          type: 2,
          flipped: false,
          matched: false,
        },
      ],
    };
  });

  describe("FLIP_CARD action", () => {
    it("should return a new object", () => {
      expect(reducer(MOCK_STATE, { type: "FLIP_CARD", id: 0 })).not.toBe(
        MOCK_STATE
      );
    });

    it("should set interactive to false", () => {
      const state = reducer(MOCK_STATE, { type: "FLIP_CARD", id: 0 });
      expect(state.interactive).toBeFalsy();
    });

    it("should set the given card to flipped", () => {
      const ID = 0;
      const state = reducer(MOCK_STATE, { type: "FLIP_CARD", id: ID });
      const card = state.cards.find((card) => card.id === ID);
      expect(card.flipped).toBeTruthy();
      expect(card.matched).toBeFalsy();
    });

    it("should not flip any other cards", () => {
      const ID = 0;
      const state = reducer(MOCK_STATE, { type: "FLIP_CARD", id: ID });
      const otherCards = state.cards.filter((card) => card.id !== ID);
      expect(otherCards.every((card) => !card.flipped)).toBeTruthy();
    });
  });

  describe("CHECK_BOARD action", () => {
    beforeEach(() => (MOCK_STATE.interactive = false));

    it("should not modify any cards if we are still in the middle of a valid selection", () => {
      // here we have guessed the first card, and waiting to guess the second card
      MOCK_STATE.cards[0].flipped = true;

      const state = reducer(MOCK_STATE, { type: "CHECK_BOARD" });
      expect(state.cards).toEqual(MOCK_STATE.cards);
    });

    it("should unflip all of the cards if any of the flipped cards do not match each other", () => {
      MOCK_STATE.cards[0].flipped = true;
      MOCK_STATE.cards[2].flipped = true;

      const state = reducer(MOCK_STATE, { type: "CHECK_BOARD" });
      expect(state.cards.every((card) => !card.flipped));
    });

    it("should change the cards to matching if we have a complete matching set", () => {
      MOCK_STATE.cards[0].flipped = true;
      MOCK_STATE.cards[1].flipped = true;

      const state = reducer(MOCK_STATE, { type: "CHECK_BOARD" });

      const expected = MOCK_STATE.cards;
      expected[0] = { ...expected[0], flipped: false, matched: true };
      expected[1] = { ...expected[1], flipped: false, matched: true };

      expect(state.cards).toEqual(expected);
    });

    it("should change cards to matching when we have a complete set, when we meed more than 2 cards in a pair", () => {
      // Add 2 more cards to the mok data, so we can require 3 cards to match
      MOCK_STATE.cards.push({ id: 5, type: 1, flipped: false, matched: false });
      MOCK_STATE.cards.push({ id: 6, type: 2, flipped: false, matched: false });
      MOCK_STATE.cards[0].flipped = true;
      MOCK_STATE.cards[1].flipped = true;

      let state = reducer(MOCK_STATE, { type: "CHECK_BOARD" });

      // No change until we flip the last card
      let expected = MOCK_STATE.cards;
      expect(state.cards).toEqual(MOCK_STATE.cards);

      // Flip it
      MOCK_STATE.cards[4].flipped = true;

      // All cards should now be 'matched'
      state = reducer(MOCK_STATE, { type: "CHECK_BOARD" });
      expected = MOCK_STATE.cards;
      expected[0] = { ...expected[0], flipped: false, matched: true };
      expected[1] = { ...expected[1], flipped: false, matched: true };
      expected[4] = { ...expected[4], flipped: false, matched: true };

      expect(state.cards).toEqual(expected);
    });

    it("should set interactive to true", () => {
      MOCK_STATE.cards[0].flipped = true;
      const state = reducer(MOCK_STATE, { type: "CHECK_BOARD" });
      expect(state.interactive).toBeTruthy();
    });
  });
});
