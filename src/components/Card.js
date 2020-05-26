import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const flipAnimation = keyframes`
  0% {
    transform: scaleX(1.0);
    background-image: none
  }
  50% {
    transform: scaleX(0);
    background-image: reset;
  }
  0% {
    transform: scaleX(1.0);
  }
`;

const unflipAnimation = keyframes`
  0% {
    transform: scaleX(1.0);
  }
  50% {
    transform: scaleX(0);
    background-image: none;
  }
  0% {
    transform: scaleX(1.0);
  }
`;

const Card = styled.button`
  margin: 20px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 1px;

  background-color: white;
  background-image: url(${(props) => {
    const imgUrl = `${process.env.PUBLIC_URL}/cards/${props.type}.svg`;
    return props.flipped ? imgUrl : null;
  }});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.3);

  animation-name: ${(props) =>
    props.flipped ? flipAnimation : unflipAnimation};
  animation-duration: 0.2s;
  animation-iteration-count: 1;

  :focus {
    outline: 0;
  }
  :hover {
    transform: scale(1.05);
  }
`;

Card.propTypes = {
  type: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
};

export default Card;
