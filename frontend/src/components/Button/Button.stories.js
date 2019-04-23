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
  .add("Light", () => (
    <React.Fragment>
      <Typography variant="h2">Light Buttons</Typography>
      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash;
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button size="lg">Action</Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button size="sm">Action</Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Secondary
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button secondary size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button secondary size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Disabled
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button disabled size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button disabled size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Loading
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button loading size="lg" />
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button loading size="sm" />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Warning
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button color="warning" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button color="warning" size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Highlight
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button color="highlight" size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Shadow
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button shadow size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button shadow color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button shadow loading size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button shadow disabled size="lg">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Link
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button link size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button link color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button link color="warning" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button link disabled size="lg">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button With Icons
      </Paragraph>
      <Card>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button icon={<GoMarkGithub />} iconPosition="left" size="lg">
            Action
          </Button>
        </div>

        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
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
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
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
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
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
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button shadow icon={<GoMarkGithub />} iconPosition="left" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
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

        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button icon={<MailIcon />} iconPosition="right" size="lg">
            Action
          </Button>
        </div>
      </Card>
    </React.Fragment>
  ))
  .add("Dark", () => (
    <React.Fragment>
      <Typography variant="h2">Dark Buttons</Typography>
      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Primary - Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Secondary - Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark secondary size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark secondary size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Disabled - Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark disabled size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark disabled size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Loading - Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark loading size="lg" />
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark loading size="sm" />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Warning - Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark color="warning" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark color="warning" size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Highlight - Dark
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark color="highlight" size="sm">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button &mdash; Shadow
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark shadow size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button dark shadow color="highlight" size="lg">
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button dark shadow loading size="lg">
            Action
          </Button>
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button With Icons
      </Paragraph>
      <Card dark>
        <div style={{ padding: "2rem 2rem 1rem 0px" }}>
          <Button dark icon={<GoMarkGithub />} iconPosition="left" size="lg">
            Action
          </Button>
        </div>

        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            dark
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            dark
            disabled
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            dark
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
            color="warning"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            dark
            secondary
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
            color="highlight"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            dark
            shadow
            icon={<GoMarkGithub />}
            iconPosition="left"
            size="lg"
          >
            Action
          </Button>
        </div>
        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button
            dark
            shadow
            icon={<GoMarkGithub />}
            iconPosition="left"
            color="highlight"
            size="lg"
          >
            Action
          </Button>
        </div>

        <div style={{ padding: "1rem 2rem 1rem 0px" }}>
          <Button dark icon={<MailIcon />} iconPosition="right" size="lg">
            Action
          </Button>
        </div>
      </Card>
    </React.Fragment>
  ));
