import React from "react";
import { storiesOf } from "@storybook/react";
import Box from "./Starter";

import { ThemeProvider } from "styled-components";
import theme from "assets/style/theme";

storiesOf("Starter", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add("Box", () => (
    <React.Fragment>
      <Box bg="black" color="white">
        hello
      </Box>
    </React.Fragment>
  ));
