import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/material-dashboard/Card/CardIcon.jsx";
import Typography from "components/material-dashboard/Typography/Typography.jsx";

import CardModal from "components/material-dashboard/CardModal/CardModal";
import { getAccountStatus, getAccountColor, getToken } from "lib/utility.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { USER } from "lib/queries";
import { mixpanel } from "lib/utility.jsx";

class _DashboardContent extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    mixpanel.track("Dashboard Page Load");
  }
  render() {
    const { classes, subscriptionCards, user } = this.props;
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <Card main>
              <CardHeader stats color="success" icon>
                <CardIcon color="primary">
                  <Icon>assessment</Icon>
                </CardIcon>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Welcome, {user.firstName}</h4>
                <p className={classes.cardCategory}>
                  You have 12 subscriptions.
                </p>
                <p className={classes.cardCategory}>
                  You have 12 subscriptions.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  Visit your profile to keep your billing up to date.
                </div>
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
              <CardFooter chart>
                <div className={classes.stats}>
                  By connecting an account, you agree to our &nbsp;
                  <a className={classes.textLink}>Terms of Service</a>.
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          {subscriptionCards.map(subscriptionCard => {
            var color = getAccountColor(subscriptionCard.statusAccount);
            var amount = "Pending";
            if (subscriptionCard.subscriptionPlan != null) {
              amount =
                "$" + subscriptionCard.subscriptionPlan.amount.toFixed(2);
            }
            var name = subscriptionCard.subscriptionService.name.toLowerCase();
            name = name.split(" ").join("_");
            return (
              <GridItem key={subscriptionCard.id} xs={12} sm={6} md={6} lg={6}>
                <Card subscription>
                  <CardHeader>
                    <CardIcon
                      className={classes.subscriptionCardIcon}
                      color={color}
                    />
                    <span className={classes.cardInLine}>
                      <Typography variant="h5" color={color}>
                        {getAccountStatus(subscriptionCard.statusAccount)}
                      </Typography>

                      <h5 className={classes.cardCategoryWhite}>{amount}</h5>
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
                        ".svg"
                      }
                      className={classes.cardImage}
                    />
                  </CardBody>
                  <CardFooter>
                    <span className={classes.cardInLine}>
                      <CardModal
                        subscriptionAccountKey={subscriptionCard.id}
                        title={"Account Login"}
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
  withRouter(_DashboardContent)
);

function Dashboard() {
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

export default Dashboard;
