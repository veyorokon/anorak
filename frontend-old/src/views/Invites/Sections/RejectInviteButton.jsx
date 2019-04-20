import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import Button from "components/material-dashboard/CustomButtons/Button.jsx";

// Queries and Mutations

import { Mutation } from "react-apollo";
import { USER } from "lib/queries";
import { DELETE_INVITE } from "lib/mutations";

import { getToken } from "lib/utility.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _RejectButtonContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  handleDelete = async (invitation, deleteInvite) => {
    var subscriptionInviteKey = invitation.id;
    const variables = {
      token: getToken(),
      subscriptionInviteKey: subscriptionInviteKey
    };
    await deleteInvite({ variables });
    this.props.triggerSnackbar("Invite deleted.");
  };

  render() {
    const { classes, invitation } = this.props;
    return this.state.clicked ? (
      <Mutation
        key={invitation.id}
        mutation={DELETE_INVITE}
        refetchQueries={[
          {
            query: USER,
            variables: {
              token: getToken()
            }
          }
        ]}
      >
        {deleteInvite => (
          <Button
            color="transparent"
            onClick={() => this.handleDelete(invitation, deleteInvite)}
          >
            <span className={classes.cardCategoryRed}>Confirm</span>
          </Button>
        )}
      </Mutation>
    ) : (
      <Button
        onClick={() => this.setState({ clicked: true })}
        color="transparent"
      >
        <span className={classes.cardCategoryBlack}>Reject</span>
      </Button>
    );
  }
}

const RejectButtonContent = _RejectButtonContent;

function RejectButton(props) {
  return <RejectButtonContent {...props} />;
}

_RejectButtonContent.propTypes = {
  classes: PropTypes.object.isRequired
};

RejectButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(RejectButton));
