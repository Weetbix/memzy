import styled from "styled-components";

const Card = styled.div`
  margin: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => {
    const imgUrl = `${process.env.PUBLIC_URL}/cards/${props.type}.svg`;
    return props.flipped ? imgUrl : null;
  }});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export default Card;
