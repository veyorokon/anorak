import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";

import HeaderCard from "./Sections/HeaderCard";

import { Query } from "react-apollo";
import { USER } from "lib/queries";
import { getToken } from "lib/utility.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _InvitesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, user } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <HeaderCard />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <HeaderCard />
        </GridItem>
      </GridContainer>
    );
  }
}
//<Sharing account={account} user={user} />
const InvitesContent = _InvitesContent;

function Invites(props) {
  const { classes } = props;

  return (
    <Query query={USER} variables={{ token: getToken() }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data.user);
        return <InvitesContent user={data.user} classes={classes} />;
      }}
    </Query>
  );
}

Invites.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(Invites));
