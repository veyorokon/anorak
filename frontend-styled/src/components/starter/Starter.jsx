import styled from "styled-components";
import { color, space, width } from "styled-system";

const Box = styled("div")(
  {
    boxSizing: "border-box"
  },
  space,
  width,
  color
);

Box.displayName = "Box";

export default Box;
