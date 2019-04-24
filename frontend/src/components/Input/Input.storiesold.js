import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import Input from "./Input";
import Search from "@material-ui/icons/Search";

storiesOf("Input", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .add("Text", () => (
    <React.Fragment>
      <Typography variant="h2">Inputs</Typography>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Normal
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 2rem 0px" }}>
          <Input placeholder="Search" />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Disabled
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 2rem 0px" }}>
          <Input disabled placeholder="Search" />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Error
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 2rem 0px" }}>
          <Input error placeholder="Search" />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Icon
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 2rem 0px" }}>
          <Input icon={<Search />} iconPosition="left" placeholder="Search" />
        </div>
      </Card>
    </React.Fragment>
  ));
