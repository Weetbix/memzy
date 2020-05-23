import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const WinnerScreen = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);

  font-family: sans-serif;
  font-size: 35px;
  font-weight: lighter;
  color: #444;

  button {
    border-style: none;
    background-color: transparent;
    font-size: 35px;
    margin: 0;
    padding: 0;
    color: #b5dc1e;
    text-decoration: underline;
  }
`;

const Component = ({ onClick }) => (
  <WinnerScreen>
    <h1>Congratulations!</h1>
    <span>
      Want to play <button onClick={onClick}>again</button>?
    </span>
  </WinnerScreen>
);

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Component;
