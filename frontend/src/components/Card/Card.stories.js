import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "./Card";

storiesOf("Card", module)
  .addDecorator(story => <div style={{ padding: "3rem 35rem" }}>{story()}</div>)
  .add("White", () => (
    <Card>
      <div style={{ padding: "20px 20px 20px 0px" }}>White Card</div>
    </Card>
  ))
  .add("Black", () => (
    <Card secondary>
      <div style={{ padding: "20px 20px 20px 0px" }}>Black Card</div>
    </Card>
  ));
