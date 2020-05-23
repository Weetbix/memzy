import styled from "styled-components";
import PropTypes from "prop-types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 140px);
  grid-template-rows: repeat(${(props) => props.height}, 140px);
`;

Grid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Grid;
