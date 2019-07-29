import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import Typography from "components/material-dashboard/Typography/Typography.jsx";

import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";

import RejectButton from "./RejectInviteButton";
import JoinButton from "./JoinInviteButton";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _InviteCardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, invite } = this.props;
    const { firstName, email } = invite.sender;
    const { subscriptionAccount } = invite;
    const serviceName = subscriptionAccount.subscriptionService.name;
    var name = subscriptionAccount.subscriptionService.name.toLowerCase();
    name = name.split(" ").join("_");
    return (
      <React.Fragment>
        <Card plain>
          <CardBody style={{ fontWeight: "400" }}>
            {firstName ? (
              <span>Your friend {firstName} invited you!</span>
            ) : (
              <span> Invited by {email}...</span>
            )}
          </CardBody>
        </Card>

        <Card subscriptionLight>
          <CardHeader style={{ textAlign: "center", marginTop: "1rem" }}>
            <Typography variant="h5" color={"primary"}>
              <span
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  fontWeight: "300"
                }}
              >
                {serviceName}
              </span>
            </Typography>
          </CardHeader>
          <CardBody subscription>
            <img
              src={
                process.env.REACT_APP_STATIC_FILES +
                "logos/" +
                name +
                "/svg/" +
                name +
                "--dark.svg"
              }
              className={classes.cardImage}
            />
          </CardBody>
          <CardFooter>
            <span className={classes.cardInLineMargin}>
              <RejectButton {...this.props} invitation={invite} />
              <JoinButton {...this.props} invitation={invite} />
            </span>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

const InviteCardContent = _InviteCardContent;

function InviteCard(props) {
  return <InviteCardContent {...props} />;
}

_InviteCardContent.propTypes = {
  classes: PropTypes.object.isRequired
};

InviteCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(InviteCard));
