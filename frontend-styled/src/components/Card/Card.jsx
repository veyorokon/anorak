import styled from "styled-components";
import { space, width, borderRadius, bg } from "styled-system";

const Card = styled("div")(space, width, borderRadius, bg);

Card.defaultProps = {
  bg: "background"
};

Card.displayName = "Card";

export default Card;
