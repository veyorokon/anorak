import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Subscriptions from "@material-ui/icons/Subscriptions";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import EnhancedEncryption from "@material-ui/icons/EnhancedEncryption";

// core components
import GridContainer from "components/material-landing/Grid/GridContainer.jsx";
import GridItem from "components/material-landing/Grid/GridItem.jsx";
import InfoArea from "components/material-landing/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Create Your Account For Free</h2>
            <h5 className={classes.description}>
              It's free to create an Anorak account! For each subscription, Anorak charges a monthly 3% + 0.50 cent management fee up to a max of $5.00 combined for all your subscriptions.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Subscription Dashboard"
                description="An intuitive layout provides instant access to your accounts and the ability to add subscriptions at any time."
                icon={Subscriptions}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Password Vault"
                description="AES-256 bit encryption and salted hashes keep your passwords secure without the need to remember them."
                icon={EnhancedEncryption}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Shared Accounts"
                description="You decide how you share subscriptions by inviting friends or family and control their access on your terms."
                icon={GroupAdd}
                iconColor="success"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
