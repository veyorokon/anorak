import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/material-landing/Header/HeaderLanding.jsx";
import Footer from "components/material-landing/Footer/Footer.jsx";
import GridContainer from "components/material-landing/Grid/GridContainer.jsx";
import GridItem from "components/material-landing/Grid/GridItem.jsx";
import Button from "components/material-landing/CustomButtons/Button.jsx";
import HeaderLinks from "components/material-landing/Header/HeaderLandingLinks.jsx";
import Parallax from "components/material-landing/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";

const landingRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={landingRoutes}
          brand="Anorak"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Anorak</h1>
                <h4>
                  Subscriptions are a hassle and everyone needs an easier way to manage them. With Anorak, you can subscribe, cancel, share and discover subscriptions from one place.
                </h4>
                <br />
                
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);