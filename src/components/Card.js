import styled from "styled-components";
import CardImage from "../cards/undraw_secure_login_pdn4.svg";

const Card = styled.div`
  margin: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => (props.flipped ? CardImage : null)});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export default Card;
