import { style } from "styled-system";

const fontSize = style({
  // React prop name and CSS property
  prop: "fontSize",
  // CSS property (if different from prop argument)
  cssProperty: "fontSize",
  // key for theme values
  key: "fontSizes",
  // accessor function for transforming the value
  transformValue: n => n + "rem",
  // Optional prop alias
  alias: "fs"
});

export { fontSize };
