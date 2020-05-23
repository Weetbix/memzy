import React, { useReducer } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Grid from "./components/Grid";
import shuffle from "lodash/shuffle";

const GRID_WIDTH = 5;
const GRID_HEIGHT = 4;

const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function createInitalState(numberOfCards) {
  const cards = [];

  const NUMBER_PER_MATCH = 2;

  // Add pairs of cards to the state
  for (let i = 0; i < numberOfCards; i++) {
    cards.push({
      id: i,
      type: i % (numberOfCards / NUMBER_PER_MATCH),
      flipped: false,
      matched: false,
    });
  }

  return {
    cards: shuffle(cards),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return createInitalState(action.numberOfCards);
    case "FLIP_CARD":
      console.log(action);
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id !== action.id ? { ...card } : { ...card, flipped: true }
        ),
      };
    default:
      return state;
  }
}

function App() {
  const numberOfCards = GRID_WIDTH * GRID_HEIGHT;
  const [state, dispatch] = useReducer(
    reducer,
    numberOfCards,
    createInitalState
  );

  const cards = state.cards.map((card) => (
    <Card
      flipped={card.flipped}
      type={card.type}
      onClick={() => dispatch({ type: "FLIP_CARD", id: card.id })}
    />
  ));

  return (
    <Page>
      <Grid width={GRID_WIDTH} height={GRID_HEIGHT}>
        {cards}
      </Grid>
    </Page>
  );
}

export default App;
