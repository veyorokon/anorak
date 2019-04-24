import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import Input from "./Input";
import Button from "../Button/Button";
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
        <Input
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Error
      </Paragraph>
      <Card>
        <Input
          error
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Success
      </Paragraph>
      <Card>
        <Input
          success
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button
      </Paragraph>
      <Card>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Input
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button size="md">Search</Button>
        </div>
      </Card>
    </React.Fragment>
  ));
