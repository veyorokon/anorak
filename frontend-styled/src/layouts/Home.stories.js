import React from "react";
import { MemoryRouter } from "react-router";
import { storiesOf } from "@storybook/react";
import Home from "../layouts/Home";

storiesOf("Views", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("homepage", () => {
    return <Home />;
  });
