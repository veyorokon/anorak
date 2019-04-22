import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "./Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";

storiesOf("Card", module)
  .addDecorator(story => <div style={{ padding: "3rem 35rem" }}>{story()}</div>)
  .add("Cards", () => (
    <React.Fragment>
      <Typography variant="h2">Cards</Typography>
      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Card &mdash; White
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 20px 0px" }}>White Card</div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Card &mdash; Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "20px 20px 20px 0px" }}>Black Card</div>
      </Card>
    </React.Fragment>
  ));
