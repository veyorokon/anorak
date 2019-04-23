import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "./Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

storiesOf("Card", module)
  .addDecorator(story => <div style={{ padding: "3rem 35rem" }}>{story()}</div>)
  .add("Cards", () => (
    <React.Fragment>
      <Typography variant="h2">Cards</Typography>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Card &mdash; Light Complex
      </Paragraph>
      <Card>
        <Typography variant="h2">Complex Card</Typography>
        <div style={{ padding: "0rem 2rem 1rem 0px" }}>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Paragraph>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button size="sm">Action</Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Card &mdash; Dark Complex
      </Paragraph>
      <Card dark>
        <Typography secondary variant="h2">
          Complex Card
        </Typography>
        <div style={{ padding: "0rem 2rem 1rem 0px" }}>
          <Paragraph secondary>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Paragraph>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark size="sm">
            Action
          </Button>
        </div>
      </Card>
    </React.Fragment>
  ));
