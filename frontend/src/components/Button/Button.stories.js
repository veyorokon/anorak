import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Button from "./Button";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import MailIcon from "@material-ui/icons/Mail";
import { GoMarkGithub } from "react-icons/go";

storiesOf("Button", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .add("Buttons", () => (
    <React.Fragment>
      <Typography variant="h2">Buttons</Typography>
      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Primary
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button size="lg">Action</Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button size="sm">Action</Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Secondary
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button secondary size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button secondary size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Disabled
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button disabled size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button disabled size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Loading
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button loading size="lg" />
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button loading size="sm" />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Warning
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button color="warning" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button color="warning" size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Highlight
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button color="highlight" size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Shadow
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button shadow size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button shadow color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button shadow loading size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button shadow disabled size="lg">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Link
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button link size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button link color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button link color="warning" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 20px 0px" }}>
          <Button link disabled size="lg">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button With Icons
      </Paragraph>
      <Card>
        <div style={{ padding: "20px 20px 10px 0px" }}>
          <Button icon={<GoMarkGithub />} iconPosition="left" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button
            disabled
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
            color="warning"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
            color="highlight"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button shadow icon={<GoMarkGithub />} iconPosition="left" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button
            shadow
            icon={<GoMarkGithub />}
            iconPosition="left"
            color="highlight"
            size="lg"
          >
            Action
          </Button>
        </div>

        <div style={{ padding: "10px 20px 10px 0px" }}>
          <Button icon={<MailIcon />} iconPosition="right" size="lg">
            Action
          </Button>
        </div>
      </Card>
    </React.Fragment>
  ));
