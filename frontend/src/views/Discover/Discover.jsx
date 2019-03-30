import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import { getToken } from "lib/utility.jsx";
import discoverStyle from "assets/jss/material-dashboard-react/views/discoverStyle.jsx";
import { withRouter } from "react-router-dom";

class Discover extends React.Component {
  render() {
    return <div>hi</div>;
  }
}

Discover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(discoverStyle)(withRouter(Discover));
