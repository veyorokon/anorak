import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Typography from "./Typography";
import Paragraph from "./Paragraph";

storiesOf("Typography", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .add("Heading", () => (
    <React.Fragment>
      <Typography variant="h2">Heading</Typography>
      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        32px &mdash; H1 Heading
      </Paragraph>
      <Card>
        <Typography variant="h1">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        24px &mdash; H2 Heading
      </Paragraph>
      <Card>
        <Typography variant="h2">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        18px &mdash; H3 Heading
      </Paragraph>
      <Card>
        <Typography variant="h3">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        16px &mdash; H4 Heading
      </Paragraph>
      <Card>
        <Typography variant="h4">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        14px &mdash; Subheading
      </Paragraph>
      <Card>
        <Typography variant="subheading">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        32px &mdash; H1 Heading on Dark Background
      </Paragraph>
      <Card dark>
        <Typography variant="h1" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        24px &mdash; H2 Heading on Dark Background
      </Paragraph>
      <Card dark>
        <Typography variant="h2" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        18px &mdash; H3 Heading on Dark Background
      </Paragraph>
      <Card dark>
        <Typography variant="h3" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        16px &mdash; H4 Heading on Dark Background
      </Paragraph>
      <Card dark>
        <Typography variant="h4" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        14px &mdash; Subheading on Dark Background
      </Paragraph>
      <Card dark>
        <Typography variant="subheading">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
    </React.Fragment>
  ))

  .add("Paragraph", () => (
    <React.Fragment>
      <Typography variant="h2">Paragraph</Typography>
      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        14px &mdash; Regular
      </Paragraph>
      <Card>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        14px &mdash; on Dark Background
      </Paragraph>
      <Card dark>
        <Paragraph secondary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        14px &mdash; Tertiary Color
      </Paragraph>
      <Card>
        <Paragraph tertiary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
      </Card>
    </React.Fragment>
  ));
