import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";

import { formatEpochTime, getAccountStatus } from "lib/utility.jsx";

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
function getSum(n1, n2) {
  return parseFloat(n1) + parseFloat(n2);
}

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelClicked: false,
      submitted: false
    };
  }

  render() {
    const { classes, getValue } = this.props;
    var responsibleUser = getValue("responsibleUser").firstName;
    if (responsibleUser == "") {
      responsibleUser = getValue("responsibleUser").email;
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Service"
              id="service"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: getValue("subscriptionService").name
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Status"
              id="status"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: getAccountStatus(getValue("statusAccount"))
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Created"
              id="created"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: formatEpochTime(getValue("dateCreated"))
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Owner"
              id="owner"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: responsibleUser
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Price"
              id="price"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: "$" + getValue("subscriptionPlan").amount
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Overview);
