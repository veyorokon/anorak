import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Typography from "./Typography";

storiesOf("Typography", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .add("Primary", () => (
    <React.Fragment>
      <Card>
        <Typography variant="h1">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card>
        <Typography variant="h2">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card>
        <Typography variant="h3">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card>
        <Typography variant="h4">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card>
        <Typography variant="subheading">
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
    </React.Fragment>
  ))
  .add("Secondary", () => (
    <React.Fragment>
      <Card secondary>
        <Typography variant="h1" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card secondary>
        <Typography variant="h2" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card secondary>
        <Typography variant="h3" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card secondary>
        <Typography variant="h4" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
      <Card secondary>
        <Typography variant="subheading" secondary>
          The Evil Rabbit Jumped over the Fence
        </Typography>
      </Card>
    </React.Fragment>
  ));
