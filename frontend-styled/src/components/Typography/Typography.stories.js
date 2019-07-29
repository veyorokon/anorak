import React from "react";
import { storiesOf } from "@storybook/react";
import Typography from "./Typography";

import { ThemeProvider } from "styled-components";
import theme from "assets/style/theme";

storiesOf("Typography", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add("Typography", () => (
    <React.Fragment>
      <Typography variant="h1" fs={1.6}>
        hello
      </Typography>
    </React.Fragment>
  ));
