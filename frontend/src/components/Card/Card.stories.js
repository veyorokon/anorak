import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "./Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

storiesOf("Card", module)
  .addDecorator(story => <div style={{ padding: "3rem 20vw" }}>{story()}</div>)
  .add("Complex", () => (
    <React.Fragment>
      <Typography variant="h2">Cards</Typography>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Card &mdash; Light Complex
      </Paragraph>
      <Card>
        <Typography variant="h2">Complex Card</Typography>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
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
        <Paragraph secondary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
        <div style={{ padding: "1rem 2rem 2rem 0px" }}>
          <Button dark size="sm">
            Action
          </Button>
        </div>
      </Card>
    </React.Fragment>
  ))
  .add("Images", () => (
    <React.Fragment>
      <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
        <Typography variant="h2">Cards</Typography>

        <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
          Image Card &mdash; Without Caption
        </Paragraph>
        <Card image>
          <div style={{ padding: "2rem 0px" }}>
            <figure style={{ margin: "0rem auto" }}>
              <div
                style={{
                  position: "relative",
                  display: "block",
                  paddingBottom: "57.222%"
                }}
              >
                <img
                  style={{
                    height: "auto",
                    width: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0"
                  }}
                  src={require("../../assets/img/sample.png")}
                />
              </div>
            </figure>
          </div>
        </Card>

        <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
          Image Card &mdash; With Caption
        </Paragraph>
        <Card image>
          <div style={{ padding: "2rem 0px" }}>
            <figure style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  position: "relative",
                  display: "block",
                  paddingBottom: "57.222%"
                }}
              >
                <img
                  style={{
                    height: "auto",
                    width: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0"
                  }}
                  src={require("../../assets/img/sample.png")}
                />
              </div>
              <Paragraph style={{ fontSize: "1.6rem" }}>
                Here is a caption for the image
              </Paragraph>
            </figure>
          </div>
        </Card>
      </div>
    </React.Fragment>
  ));
