import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import Navbar from "./Navbar";

storiesOf("Navbar", module).add("HomeNav", () => (
  <React.Fragment>
    <Typography variant="h2">Navbar</Typography>
    <Navbar />
  </React.Fragment>
));
