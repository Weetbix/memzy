import React, { useReducer } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Grid from "./components/Grid";
import { reducer, createInitalState } from "./reducer";

const GRID_WIDTH = 5;
const GRID_HEIGHT = 4;

const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const numberOfCards = GRID_WIDTH * GRID_HEIGHT;
  const [state, dispatch] = useReducer(
    reducer,
    numberOfCards,
    createInitalState
  );

  const cards = state.cards.map((card) => (
    <Card
      flipped={card.flipped || card.matched}
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
