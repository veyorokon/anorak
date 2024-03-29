import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";

import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import AddIcon from "@material-ui/icons/Add";
import MailIcon from "@material-ui/icons/Mail";

import Icon from "@material-ui/core/Icon";
import CardIcon from "components/material-dashboard/Card/CardIcon.jsx";
import Typography from "components/material-dashboard/Typography/Typography.jsx";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";

import CardModal from "components/material-dashboard/CardModal/CardModal";
import {
  isAccountStatusActive,
  getAccountStatus,
  getAccountColor,
  getToken,
  getPlanFrequency
} from "lib/utility.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Query, Mutation } from "react-apollo";
import { USER } from "lib/queries";
import { VERIFY_USER } from "lib/mutations";
import { mixpanel } from "lib/utility.jsx";

class _DashboardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      monthlySubscriptionCount: 0,
      yearlySubscriptionCount: 0,
      averageMonthlyCost: 0,
      subscriptionTotal: 0,
      yearlyTotal: 0,
      activeSubscriptionCount: 0
    };

    var alerVerified = localStorage.getItem("alertVerified");
    if (alerVerified) {
      this.props.triggerSnackbar("You've verified your account.");
      localStorage.removeItem("alertVerified");
    }
  }

  componentDidMount() {
    if (this.props.verifyUser && !this.props.user.isVerified) {
      this.props.verifyUser();
      localStorage.setItem("alertVerified", true);
      this.props.history.push("/dashboard/home");
    }

    this.processSubscriptions(this.props.subscriptionCards);
    mixpanel.track("Dashboard Page Load");
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  processSubscriptions = subscriptionCards => {
    var monthlySubscriptionCount = 0;
    var yearlySubscriptionCount = 0;
    var weeklySubscriptionCount = 0;
    var subscriptionTotal = 0;
    var yearlyTotal = 0;
    var averageMonthlyCost = 0;
    var activeSubscriptionCount = 0;

    for (var i = 0; i < subscriptionCards.length; i++) {
      var subscription = subscriptionCards[i];
      var active = isAccountStatusActive(subscription.statusAccount);
      if (active && subscription.subscriptionPlan) {
        var frequency = subscription.subscriptionPlan.billingFrequency;
        if (frequency == "A_20") {
          monthlySubscriptionCount++;
          averageMonthlyCost += subscription.subscriptionPlan.amount;
          yearlyTotal += subscription.subscriptionPlan.amount * 12;
        } else if (frequency == "A_30") {
          yearlySubscriptionCount++;
          averageMonthlyCost += subscription.subscriptionPlan.amount / 12;
          yearlyTotal += subscription.subscriptionPlan.amount;
        } else if (frequency == "A_10") {
          averageMonthlyCost += subscription.subscriptionPlan.amount * 4;
          yearlyTotal += subscription.subscriptionPlan.amount * 52;
          weeklySubscriptionCount++;
        }
        subscriptionTotal += subscription.subscriptionPlan.amount;
        activeSubscriptionCount++;
      }
    }
    this.setState({
      monthlySubscriptionCount,
      yearlySubscriptionCount,
      activeSubscriptionCount,
      weeklySubscriptionCount,
      yearlyTotal: yearlyTotal.toFixed(2),
      averageMonthlyCost: averageMonthlyCost.toFixed(2),
      subscriptionTotal: subscriptionTotal.toFixed(2)
    });
  };

  render() {
    const { classes, user } = this.props;
    let hasPendingInvite = user.invitesReceived;
    if (hasPendingInvite) {
      hasPendingInvite = user.invitesReceived.some(
        invite => invite["processed"] === false
      );
    } else {
      hasPendingInvite = false;
    }
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <Card main>
              {/*
                <CardHeader color="success" icon>
                <CardIcon color="primary">
                  <Icon>assessment</Icon>
                </CardIcon>
              </CardHeader>
              */}
              <CardBody style={{ paddingBottom: "0" }}>
                <h3 className={classes.cardTitle}>Welcome, {user.firstName}</h3>

                <ul
                  style={{
                    textAlign: "left",
                    listStyle: "none",
                    padding: "1vh 2vw"
                  }}
                >
                  <li className={classes.cardCategorySpaced}>
                    Yearly Subscriptions:{" "}
                    <span style={{ fontWeight: "500" }}>
                      {this.state.yearlySubscriptionCount}
                    </span>
                  </li>
                  <li className={classes.cardCategorySpaced}>
                    Monthly Subscriptions:{" "}
                    <span style={{ fontWeight: "500" }}>
                      {this.state.monthlySubscriptionCount}
                    </span>
                  </li>
                  <li className={classes.cardCategorySpaced}>
                    Weekly Subscriptions:{" "}
                    <span style={{ fontWeight: "500" }}>
                      {this.state.weeklySubscriptionCount}
                    </span>
                  </li>
                  <li className={classes.cardCategorySpaced}>
                    Monthly average:{" "}
                    <span style={{ fontWeight: "500" }}>
                      ${this.state.averageMonthlyCost}
                    </span>
                  </li>
                  <li className={classes.cardCategorySpaced}>
                    Yearly total:{" "}
                    <span style={{ fontWeight: "500" }}>
                      ${this.state.yearlyTotal}
                    </span>
                  </li>
                </ul>
              </CardBody>
              <CardFooter
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingTop: "0"
                }}
              >
                {hasPendingInvite ? (
                  <Button
                    color="transparent"
                    round
                    aria-label="Add"
                    onClick={() => {
                      this.props.history.push("/dashboard/invites");
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        color: "red"
                      }}
                    >
                      <MailIcon />
                      You have an invitation
                    </span>
                  </Button>
                ) : (
                  <p>No new notifications</p>
                )}
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={6}>
            <Card add>
              <CardHeader add>
                <h4 className={classes.cardTitle}>Add A Subscription</h4>
                <p className={classes.cardCategory}>
                  Add your subscription accounts to completely manage them from
                  your dashboard.
                </p>
              </CardHeader>
              <CardBody add>
                <p className={classes.cardCategory}>
                  <Button
                    color="primary"
                    round
                    aria-label="Add"
                    onClick={() => {
                      this.props.history.push("/dashboard/add");
                    }}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Add
                  </Button>
                </p>
              </CardBody>
            </Card>
          </GridItem>

          {user.dashboardAccounts.map(subscriptionCard => {
            var color = getAccountColor(subscriptionCard.statusAccount);
            var amount = "Pending";
            if (subscriptionCard.subscriptionPlan != null) {
              amount =
                "$" + subscriptionCard.subscriptionPlan.amount.toFixed(2);
            }
            var name = subscriptionCard.subscriptionService.name.toLowerCase();
            name = name.split(" ").join("_");
            const frequencyCode =
              subscriptionCard.subscriptionPlan.billingFrequency;
            const frequency = getPlanFrequency(frequencyCode);
            return (
              <GridItem key={subscriptionCard.id} xs={12} sm={6} md={6} lg={6}>
                <Card subscription>
                  <CardHeader style={{ margin: "0 .75rem" }}>
                    <span className={classes.cardInLine}>
                      <Typography variant="h5" color={color}>
                        {getAccountStatus(subscriptionCard.statusAccount)}
                      </Typography>

                      <h5 className={classes.cardCategoryWhite}>{amount}</h5>
                      <h5 className={classes.cardCategoryWhite}>{frequency}</h5>
                    </span>
                  </CardHeader>
                  <CardBody subscription>
                    <img
                      src={
                        process.env.REACT_APP_STATIC_FILES +
                        "logos/" +
                        name +
                        "/svg/" +
                        name +
                        "--light.svg"
                      }
                      className={classes.cardImage}
                    />
                  </CardBody>
                  <CardFooter>
                    <span className={classes.cardInLine}>
                      <CardModal
                        subscriptionAccountKey={subscriptionCard.id}
                        title={"Account Login"}
                        color={"transparentWhite"}
                      />
                      <Button
                        onClick={() => {
                          this.props.history.push(
                            "manage/" + subscriptionCard.id
                          );
                        }}
                        color="transparent"
                      >
                        <span className={classes.cardCategoryWhite}>
                          Manage
                        </span>
                      </Button>
                    </span>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })}

          {user.joinedAccounts.map(subscriptionCard => {
            var name = subscriptionCard.subscriptionService.name.toLowerCase();
            name = name.split(" ").join("_");
            return (
              <GridItem key={subscriptionCard.id} xs={12} sm={6} md={6} lg={6}>
                <Card subscriptionLight>
                  <CardHeader style={{ margin: "0 .75rem" }}>
                    <span className={classes.cardInLine}>
                      <Typography variant="h5" color={"success"}>
                        Member
                      </Typography>
                      <h5 className={classes.cardCategoryBlack}>Free</h5>
                    </span>
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
                    <span className={classes.cardInLine}>
                      <CardModal
                        subscriptionAccountKey={subscriptionCard.id}
                        title={"Account Login"}
                        color={"transparentBlack"}
                      />
                      <Button
                        onClick={() => {
                          this.props.history.push(
                            "manage/" + subscriptionCard.id
                          );
                        }}
                        color="transparent"
                      >
                        <span className={classes.cardCategoryBlack}>
                          Manage
                        </span>
                      </Button>
                    </span>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })}
        </GridContainer>
      </React.Fragment>
    );
  }
}

_DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  subscriptionCards: PropTypes.array,
  user: PropTypes.object
};

const DashboardContent = withStyles(dashboardStyle)(
  withSnackbar(withRouter(_DashboardContent))
);

function getActivationCode(path) {
  return path.substr(path.lastIndexOf("/") + 1);
}

class Dashboard extends React.Component {
  onSubmit = async (verifyUser, code) => {
    console.log(code);
    const variables = {
      token: getToken(),
      code: code
    };
    await verifyUser({ variables });
  };

  render() {
    const { classes } = this.props;
    const path = this.props.location.pathname;
    const code = getActivationCode(path);

    if (code.length == 120) {
      return (
        <Mutation
          mutation={VERIFY_USER}
          variables={{ token: getToken(), code: code }}
        >
          {(verifyUser, { loading, error }) => {
            if (loading) return <div>loading</div>;
            if (error) return <p>An error occurred</p>;
            return (
              <Query
                query={USER}
                variables={{ token: getToken() }}
                fetchPolicy="network-only"
              >
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`; //redirect on error

                  return (
                    <DashboardContent
                      user={data.user}
                      verifyUser={verifyUser}
                    />
                  );
                }}
              </Query>
            );
          }}
        </Mutation>
      );
    }
    return (
      <Query
        query={USER}
        variables={{ token: getToken() }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`; //redirect on error
          let subscriptionCards = [];
          data.user.dashboardAccounts.forEach(elem => {
            subscriptionCards.push(elem);
          });
          return (
            <DashboardContent
              user={data.user}
              subscriptionCards={subscriptionCards}
            />
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Dashboard);
