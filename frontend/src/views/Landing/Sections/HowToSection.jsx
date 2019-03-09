import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import AddToQueue from "@material-ui/icons/AddToQueue";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import Receipt from "@material-ui/icons/Receipt";

// core components
import GridContainer from "components/material-landing/Grid/GridContainer.jsx";
import GridItem from "components/material-landing/Grid/GridItem.jsx";
import InfoArea from "components/material-landing/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class HowToSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>How It Works</h2>
            <h5 className={classes.description}>
              Anorak will automatically sychronize subscription billing so all of your subscriptions renew at the same time and appear on a single receipt. With Anorak, you can add or create new subscription accounts or cancel them when you want. 
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Add Your Subscription"
                description="Connect an existing account or let Anorak create a new account for you with a randomly generated password."
                icon={AddToQueue}
                iconColor="warning"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Anorak Connects Your Account"
                description="Anorak automatically creates a virtual credit card linked to your account and synchronizes subscription renewals."
                icon={Receipt}
                iconColor="primary"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Subscription Cards"
                description="Your subscriptions are organized as cards for account login and management at the click of a button."
                icon={ViewAgenda}
                iconColor="secondary"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(HowToSection);
