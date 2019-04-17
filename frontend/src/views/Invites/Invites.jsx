import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";

import InviteCard from "./Sections/InviteCard";

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

  renderNoInvites = () => {
    return <div>no</div>;
  };

  renderInvites(invite) {
    return (
      <React.Fragment>
        <h3>You were invited!</h3>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <InviteCard />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }

  render() {
    const { classes, user } = this.props;
    const invites = user.invitesReceived;
    //Chck if user is verified. Check if they have invites

    return (
      <React.Fragment>
        <h3>You were invited!</h3>
        <GridContainer>
          {invites.map(invite => {
            return (
              <GridItem key={invite.id} xs={12} sm={6} md={6} lg={6}>
                <InviteCard invite={invite} />
              </GridItem>
            );
          })}
        </GridContainer>
      </React.Fragment>
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
        return <InvitesContent user={data.user} classes={classes} />;
      }}
    </Query>
  );
}

Invites.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(Invites));
