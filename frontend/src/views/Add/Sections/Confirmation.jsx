import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardAvatar from "components/material-dashboard/Card/CardAvatar.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

function Confirmation(props) {
  const { classes, service, size, price, password, email } = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Service"
                  id="service"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: service
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={6} md={3}>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: email
                  }}
                />
              </GridItem>

              {password && (
                <GridItem xs={12} sm={6} md={3}>
                  <CustomInput
                    password
                    type="password"
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: password
                    }}
                  />
                </GridItem>
              )}
            </GridContainer>
            <GridContainer>
              <GridItem xs={4} sm={4} md={4}>
                <CustomInput
                  labelText="Price"
                  id="price"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: price
                  }}
                />
              </GridItem>
              <GridItem xs={4} sm={4} md={4}>
                <CustomInput
                  labelText="Duration"
                  id="duration"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: "Monthly"
                  }}
                />
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(Confirmation);
