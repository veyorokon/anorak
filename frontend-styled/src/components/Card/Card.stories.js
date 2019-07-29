import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "./Card";

import { ThemeProvider } from "styled-components";
import theme from "assets/style/theme";

storiesOf("Card", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add("Card", () => (
    <React.Fragment>
      <Card
        width={[
          1, // 100% below the smallest breakpoint
          1 / 2, // 50% from the next breakpoint and up
          1 / 4 // 25% from the next breakpoint and up
        ]}
      >
        hello
      </Card>
    </React.Fragment>
  ));
