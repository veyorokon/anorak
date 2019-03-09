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
import ScrollableAnchor from 'react-scrollable-anchor'

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import HowToSection from "./Sections/HowToSection.jsx";
import ProductSection from "./Sections/ProductSection.jsx";
import CallToAction from "./Sections/CallToAction.jsx";

import {mixpanel} from "lib/utility";

class LandingPage extends React.Component {
componentDidMount(){
    mixpanel.track('Landing Page Load');
}
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          brand="Anorak"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg-old.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Anorak</h1>
                <h4>
                  Subscriptions are a hassle and everyone needs an easier way to manage them. With Anorak, you have one place for all your subscriptions.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="#signup"
                >
                  <i className="fas fa-rocket" />&nbsp;
                  Get Started
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <HowToSection />
            <ScrollableAnchor id={'signup'}>
                <CallToAction />
          </ScrollableAnchor>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
