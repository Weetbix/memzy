import React from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Grid from "./components/Grid";

const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const GRID_WIDTH = 5;
  const GRID_HEIGHT = 5;

  const cards = [];
  for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
    cards.push(<Card />);
  }

  return (
    <Page>
      <Grid width={GRID_WIDTH} height={GRID_HEIGHT}>
        {cards}
      </Grid>
    </Page>
  );
}

export default App;
