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

  // Add pairs of cards to the state
  for (let i = 0; i < numberOfCards; i += 2) {
    const defaults = { id: i, flipped: false, matched: false };
    cards.push({ ...defaults });
    cards.push({ ...defaults });
  }

  return {
    cards: shuffle(cards),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return createInitalState(action.numberOfCards);
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

  const cards = state.cards.map((card) => <Card flipped={card.flipped} />);

  return (
    <Page>
      <Grid width={GRID_WIDTH} height={GRID_HEIGHT}>
        {cards}
      </Grid>
    </Page>
  );
}

export default App;
