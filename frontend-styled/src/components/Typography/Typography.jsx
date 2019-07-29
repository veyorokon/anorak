import styled from "styled-components";
import { color, themeGet } from "styled-system";
import { fontSize } from "assets/style/utility";
import { withDynamicTag } from "./DynamicTag";

const Typography = styled("div")(fontSize, color);
//
// const Typography = withTheme(props => {
//   const variantStyle = themeGet(`typographyStyles.${variation}`);
// }

Typography.defaultProps = {
  color: "text",
  fontSize: 1.6
};

Typography.displayName = "Typography";

export default withDynamicTag(Typography);
