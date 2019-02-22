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
import landingRoutes from "routes/landing.jsx";
import landingStyle from "assets/jss/material-dashboard-react/layouts/landingStyle.jsx";
import "assets/scss/material-kit-react.scss?v=1.4.0";

const switchRoutes = (
  <Switch>
    {landingRoutes.map((prop, key) => {
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
  }
  
  render() {
    const { classes, ...rest } = this.props;
    return (
         
          <div className={classes.mainPanel} ref="mainPanel">
            
                <div className={classes.container}>{switchRoutes}</div>
            
          </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(landingStyle)(App);
