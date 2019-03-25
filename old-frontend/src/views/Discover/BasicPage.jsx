import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import { getToken } from "lib/utility.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {USER} from "lib/queries";
import {mixpanel} from "lib/utility.jsx";


class Dashboard extends React.Component {
  render(){
      return (
          <div> 
          </div>
      )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(Dashboard));
