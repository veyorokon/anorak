/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/material-dashboard/Header/Header.jsx";
import Footer from "components/material-dashboard/Footer/Footer.jsx";
import Sidebar from "components/material-dashboard/Sidebar/Sidebar.jsx";

import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";

import discoverRoutes from "routes/discover.jsx";

import discoverStyle from "assets/jss/material-dashboard-react/layouts/discoverStyle.jsx";


const switchRoutes = (
  <Switch>
    {discoverRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>

            <GridContainer>

                <GridItem xs={12} sm={8} md={8} lg={8}>
                  <div className={classes.mainPanel} ref="mainPanel">
                    <Sidebar
                      routes={discoverRoutes}
                      logoText={"Anorak"}
                      logo={process.env.REACT_APP_STATIC_FILES+"images/logo-a.png"}
                      image={null}
                      handleDrawerToggle={this.handleDrawerToggle}
                      open={this.state.mobileOpen}
                      {...rest}
                    />
                    <Header
                      routes={discoverRoutes}
                      handleDrawerToggle={this.handleDrawerToggle}
                      {...rest}
                    />
                    <div className={classes.content}>
                      <div className={classes.container}>{switchRoutes}</div>
                    </div>
                    {this.getRoute() ? <Footer /> : null}
                    </div>
                    </GridItem>


                  <GridItem xs={12} sm={4} md={4} lg={4}>
                      <div className={classes.content}>
                          <div className={classes.container}>{switchRoutes}</div>
                      </div>
                  </GridItem>

                </GridContainer>


      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(discoverStyle)(App);
