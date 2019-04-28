import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router";
import Typography from "../../../components/Typography/Typography";
import Hero from "./Hero";

storiesOf("Home", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("Hero", () => (
    <React.Fragment>
      <Typography variant="h2">Hero</Typography>
      <Hero />
    </React.Fragment>
  ));
