import { Paper } from "@mui/material";
import PropTypes from 'prop-types';
import styled from "styled-components";

const ProductCard = styled(Paper)`
  && {
    color: ${props => props.selected && props.theme.palette.secondary.main};
    border: ${props => props.selected ? `1px solid ${props.theme.palette.secondary.main}` : "1px solid white"};
    border-radius: 8px;
    transition: 0.3s;
    margin: ${props => props.$isModal && "32px 16px"};
  }

  :hover {
    color: ${props => props.$isList && props.theme.palette.secondary.main};
    border: ${props => props.$isList ? `1px solid ${props.theme.palette.secondary.main}` : "1px solid white"};
    transition: 0.3s;
    cursor: ${props => props.$isList && "pointer"};
  }

  h2 {
    margin-top: 0;
    color: ${props => props.theme.palette.primary.main}
  }

  h3 {
    margin: 0;
  }

  p {
    margin-top: 0;
  }
`;

ProductCard.propTypes = {
  $isList: PropTypes.bool,
  selected: PropTypes.bool
};

ProductCard.defaultProps = {
  $isList: false,
  selected: false
};

export default ProductCard;