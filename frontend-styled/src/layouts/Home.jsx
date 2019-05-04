import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "assets/jss/layouts/homeStyle.jsx";
import routes from "routes.js";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return <div>{switchRoutes}</div>;
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(homeStyle)(App);
