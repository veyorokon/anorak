import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../Card/Card";
import Paragraph from "../Typography/Paragraph";
import Typography from "../Typography/Typography";
import Input from "./Input";
import Button from "../Button/Button";
import Search from "@material-ui/icons/Search";

const inlineInputbuttonStyle = { width: "30rem" };

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
          inputprops={{
            placeholder: "Search",
            inputprops: {
              "aria-label": "Search"
            }
          }}
        />
        <div style={{ padding: "2rem 1rem 2rem 0px" }}>
          <Input
            inputprops={{
              placeholder: "Search",
              inputprops: {
                "aria-label": "Search"
              }
            }}
          />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Disabled
      </Paragraph>
      <Card>
        <Input
          disabled
          inputprops={{
            placeholder: "Search",
            inputprops: {
              "aria-label": "Search"
            }
          }}
        />
        <div style={{ padding: "2rem 1rem 2rem 0px" }}>
          <Input
            disabled
            inputprops={{
              placeholder: "Search",
              inputprops: {
                "aria-label": "Search"
              }
            }}
          />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Error
      </Paragraph>
      <Card>
        <Input
          error
          inputprops={{
            placeholder: "Search",
            inputprops: {
              "aria-label": "Search"
            }
          }}
        />
        <div style={{ padding: "2rem 1rem 2rem 0px" }}>
          <Input
            error
            inputprops={{
              placeholder: "Search",
              inputprops: {
                "aria-label": "Search"
              }
            }}
          />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Success
      </Paragraph>
      <Card>
        <Input
          success
          inputprops={{
            placeholder: "Search",
            inputprops: {
              "aria-label": "Search"
            }
          }}
        />
        <div style={{ padding: "2rem 1rem 2rem 0px" }}>
          <Input
            success
            inputprops={{
              placeholder: "Search",
              inputprops: {
                "aria-label": "Search"
              }
            }}
          />
        </div>
      </Card>

      <Paragraph tertiary style={{ fontSize: "1.2rem" }}>
        Button
      </Paragraph>
      <Card>
        <div>
          <Input
            formControlProps={{
              style: inlineInputbuttonStyle
            }}
            inputprops={{
              placeholder: "Search",
              inputprops: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="plain" size="md">
            Search
          </Button>
        </div>
        <div style={{ display: "inline-block", alignItems: "flex-end" }}>
          <Input
            inputprops={{
              placeholder: "Search",
              inputprops: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="plain" size="md">
            Search
          </Button>
        </div>
      </Card>
    </React.Fragment>
  ));
