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
