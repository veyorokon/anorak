import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import Button from "components/material-dashboard/CustomButtons/Button.jsx";

// Queries and Mutations

import { Mutation } from "react-apollo";
import { USER } from "lib/queries";
import { JOIN_INVITE } from "lib/mutations";

import { getToken } from "lib/utility.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _JoinButtonContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  handleJoin = async (invitation, joinInvite) => {
    var subscriptionInviteKey = invitation.id;
    const variables = {
      token: getToken(),
      subscriptionInviteKey: subscriptionInviteKey
    };
    await joinInvite({ variables });
    this.props.triggerSnackbar("Congrats you have a new subscription!");
  };

  render() {
    const { classes, invitation } = this.props;
    return this.state.clicked ? (
      <Mutation
        key={invitation.id}
        mutation={JOIN_INVITE}
        refetchQueries={[
          {
            query: USER,
            variables: {
              token: getToken()
            }
          }
        ]}
      >
        {joinInvite => (
          <Button
            color="transparent"
            onClick={() => this.handleJoin(invitation, joinInvite)}
          >
            <span className={classes.cardCategorySuccess}>Confirm</span>
          </Button>
        )}
      </Mutation>
    ) : (
      <Button
        onClick={() => this.setState({ clicked: true })}
        color="transparent"
      >
        <span className={classes.cardCategoryBlack}>Join</span>
      </Button>
    );
  }
}

const JoinButtonContent = _JoinButtonContent;

function JoinButton(props) {
  return <JoinButtonContent {...props} />;
}

_JoinButtonContent.propTypes = {
  classes: PropTypes.object.isRequired
};

JoinButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(JoinButton));
