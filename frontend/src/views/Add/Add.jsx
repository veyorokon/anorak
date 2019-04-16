import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";

import { withRouter } from "react-router-dom";

import NavPillsModded from "components/material-dashboard/NavPills/NavPillsModded.jsx";

import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";

import { getToken, getPlanFrequency } from "lib/utility.jsx";
import Confirmation from "./Sections/Confirmation.jsx";
import Login from "./Sections/Login.jsx";
import Plan from "./Sections/Plan.jsx";
import Subscription from "./Sections/Subscription.jsx";

import { USER, SUBSCRIPTION_SERVICES } from "lib/queries";
import { ADD_SUBSCRIPTION_ACCOUNT } from "lib/mutations";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";

import { mixpanel } from "lib/utility.jsx";

class _CreateContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscription: 0,
      ownPassword: "",
      copied: false,
      planSelected: 0,
      activeStep: 0,
      services: this.props.services,
      submitted: false,
      email: ""
    };
  }

  componentDidMount() {
    mixpanel.track("Create Subscription Page Load");
  }

  getIndexFromName = name => {
    const services = this.state.services;
    for (var i = 0; i < services.length; i++) {
      if (services[i].name == name) {
        return i;
      }
    }
  };

  setSubscription = val => {
    const index = this.getIndexFromName(val);

    this.setState({
      subscription: index,
      planSelected: 0
    });
  };

  setOwnPassword = e => {
    this.setState({ ownPassword: e.target.value });
  };

  setPlan = val => {
    this.setState({
      planSelected: val
    });
  };

  updateShowing = () => {
    var current = this.state.activeStep + 1;
    current %= 2;
    this.setState({ activeStep: current });
  };

  onSubmit = async (createSubscriptionAccount, values) => {
    var username = this.props.user.email;
    var subscription = this.state.subscription;
    var plan = this.state.planSelected;
    var planPK = this.state.services[subscription].pricingPlans[plan].id;
    var subscriptionPK = this.state.services[subscription].id;
    // Note that the username will default to the current user's email
    const variables = {
      token: getToken(),
      serviceKey: subscriptionPK,
      planKey: planPK,
      password: this.getPassword(),
      username: username,
      isConnectedAccount: false
    };

    this.setState({ submitted: true });
    try {
      await createSubscriptionAccount({ variables });
      this.props.triggerSnackbar(
        "Success! A new subscription was added to your dashboard."
      );
      mixpanel.track("Create Attempt Successful", {
        service: this.getServiceName()
      });
      this.props.history.push("/dashboard/home");
    } catch {
      this.props.triggerSnackbar(
        "Sorry, an additional subscription account could not be created."
      );
      mixpanel.track("Create Attempt Unsuccessful", {
        service: this.getServiceName()
      });
    }

    // mixpanel.track('Squad Create', { squad: values.id });
    // this.props.triggerSnackbar('You created a Squad!');
  };

  getServiceName = () => {
    var selected = this.state.subscription;
    return this.state.services[selected].name;
  };

  getServiceSize = () => {
    var plan = this.state.planSelected;
    var selected = this.state.subscription;
    return this.state.services[selected].pricingPlans[plan].maximumSize;
  };

  getPrice = () => {
    var plan = this.state.planSelected;
    var selected = this.state.subscription;
    return "$" + this.state.services[selected].pricingPlans[plan].amount;
  };

  getPassword = () => {
    return this.state.ownPassword;
  };

  render() {
    const { classes } = this.props;
    var isShowingFirst = "none";
    var activeStep = this.state.activeStep;
    if (activeStep == 0) {
      isShowingFirst = "initial";
    }
    const name = this.state.services[this.state.subscription].name
      .toLowerCase()
      .split(" ")
      .join("_");

    const plan = this.state.services[this.state.subscription].pricingPlans[
      this.state.planSelected
    ];
    const billingFrequency = getPlanFrequency(plan.billingFrequency);

    return (
      <Mutation
        mutation={ADD_SUBSCRIPTION_ACCOUNT}
        refetchQueries={[
          {
            query: USER,
            variables: {
              token: getToken()
            }
          }
        ]}
      >
        {createSubscriptionAccount => (
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Card>
                  <NavPillsModded
                    active={this.state.activeStep}
                    transparent
                    setValCallBack={this.props.setValCallBack}
                    tabs={[
                      {
                        tabContent: (
                          <span style={{ display: isShowingFirst }}>
                            <Subscription
                              classes={classes}
                              services={this.state.services}
                              handleSetSubscription={this.setSubscription}
                            />

                            <CardBody
                              style={{
                                width: "60%",
                                height: "100px",
                                margin: "0 auto",
                                backgroundColor: "black",
                                textAlign: "center",
                                borderRadius: "4px",
                                marginTop: "1.5rem",
                                boxShadow:
                                  "0 12px 20px -10px rgba(0, 0, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 0, 0, 0.2)"
                              }}
                            >
                              <img
                                src={
                                  process.env.REACT_APP_STATIC_FILES +
                                  "logos/" +
                                  name +
                                  "/svg/" +
                                  name +
                                  ".svg"
                                }
                                style={{ height: "100%", width: "50%" }}
                              />
                            </CardBody>

                            <Plan
                              classes={classes}
                              selectedService={this.state.subscription}
                              services={this.state.services}
                              planSelected={this.state.planSelected}
                              handleSetPlan={this.setPlan}
                            />

                            <Login
                              classes={classes}
                              handleOnChange={this.setOwnPassword}
                            />
                          </span>
                        )
                      },
                      {
                        tabContent: (
                          <span>
                            <CardHeader>
                              <h4>Review Your Subscription Account:</h4>
                              <p>Please confirm everything is correct.</p>
                            </CardHeader>
                            <CardBody>
                              <Confirmation
                                service={this.getServiceName()}
                                size={this.getServiceSize()}
                                price={this.getPrice()}
                                duration={billingFrequency}
                                password={this.getPassword()}
                                email={this.props.user.email}
                              />
                            </CardBody>
                          </span>
                        )
                      }
                    ]}
                  />

                  <CardFooter />
                </Card>
                {activeStep ? (
                  <span>
                    <Button onClick={this.updateShowing}>Back</Button>
                    <Button
                      onClick={async values => {
                        await this.onSubmit(createSubscriptionAccount, values);
                        setTimeout(() => {}, 600);
                      }}
                      disabled={this.state.submitted}
                      color="success"
                    >
                      Confirm
                    </Button>
                  </span>
                ) : (
                  <Button onClick={this.updateShowing} color="primary">
                    Next
                  </Button>
                )}
              </GridItem>
            </GridContainer>
          </div>
        )}
      </Mutation>
    );
  }
}
const CreateContent = withSnackbar(withRouter(_CreateContent));

function CreateWithServices(props) {
  const { classes } = props;
  return (
    <Query query={SUBSCRIPTION_SERVICES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const services = data.subscriptionServices;
        return (
          <CreateContent
            classes={classes}
            user={props.user}
            services={services}
          />
        );
      }}
    </Query>
  );
}

function Add(props) {
  const { classes } = props;

  return (
    <Query
      query={USER}
      variables={{ token: getToken() }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const user = data.user;
        return <CreateWithServices classes={classes} user={user} />;
      }}
    </Query>
  );
}

Add.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(pillsStyle)(Add);
