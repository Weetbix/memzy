import React from "react";
import styled from "styled-components";
import CardImage from "./cards/undraw_secure_login_pdn4.svg";

const Card = styled.div`
  margin: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${CardImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 140px);
  grid-template-rows: repeat(${(props) => props.height}, 140px);
`;

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
