import React, { useReducer } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Grid from "./components/Grid";
import { reducer, createInitalState } from "./reducer";

const GRID_WIDTH = 5;
const GRID_HEIGHT = 4;
const TIMEMOUT_AFTER_CARD_FLIP = 2000;

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
      onClick={async () => {
        dispatch({ type: "FLIP_CARD", id: card.id });
        await new Promise((resolve) =>
          setTimeout(resolve, TIMEMOUT_AFTER_CARD_FLIP)
        );
        dispatch({ type: "CHECK_BOARD" });
      }}
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
