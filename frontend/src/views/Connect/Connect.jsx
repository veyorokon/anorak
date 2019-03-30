import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import { Elements, StripeProvider } from "react-stripe-elements";

import avatar from "assets/img/faces/marc.jpg";
import { withRouter } from "react-router-dom";

import AddBox from "@material-ui/icons/AddBox";
import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/Person";

import MergeType from "@material-ui/icons/MergeType";

import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import NavPillsModded from "components/material-dashboard/NavPills/NavPillsModded.jsx";

import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";

import { getToken } from "lib/utility.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Confirmation from "./Sections/Confirmation.jsx";

import { USER, SUBSCRIPTION_SERVICES } from "lib/queries";
import { CREATE_SUBSCRIPTION_ACCOUNT } from "lib/mutations";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";

import { mixpanel } from "lib/utility.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class _ConnectContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExisting: 1,
      isGenerateDisabled: true,
      isGeneratedPassword: 0,
      subscription: 0,
      ownPassword: "",
      copied: false,
      isGenerateDisabled: true,
      planSelected: 0,
      activeStep: 0,
      services: this.props.services,
      submitted: false,
      email: ""
    };
  }

  componentDidMount() {
    mixpanel.track("Connect Subscription Page Load");
  }

  setSubscription = val => {
    this.setState({
      subscription: val,
      planSelected: 0
    });
  };

  setUsingGenerated = val => {
    this.setState({
      isGeneratedPassword: val
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

  loginSection = (classes, isGenDisabled, generatedPassword) => {
    return (
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h3>
              <small>Account Password:</small>
            </h3>
          </div>

          <GridItem xs={6} sm={6} md={4} lg={8}>
            <CustomInput
              labelText="Password"
              id="setpassword"
              type={"password"}
              onChange={this.setOwnPassword}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>

          <p>
            Once set, passwords can be retrieved anytime from your dashboard.
          </p>
        </div>
      </div>
    );
  };

  subscriptionSection = classes => {
    var tabs = this.state.services.map(service => ({
      tabButton: service.name,
      tabIcon: AddBox,
      marginedTab: true,
      tabContent: (
        <span>
          <p>{service.name} streaming service for content on demand.</p>
        </span>
      )
    }));

    return (
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h3>
              <small>Subscription Service:</small>
            </h3>
          </div>
          <NavPills
            setValCallBack={this.setSubscription}
            color="primary"
            tabs={tabs}
          />
        </div>
      </div>
    );
  };

  planSection = classes => {
    var selectedService = this.state.subscription;
    var pricingPlans = this.state.services[selectedService].pricingPlans;
    var tabs = pricingPlans.map(plan => {
      if (plan.maximumSize === 1) {
        return {
          tabButton: "Individual",
          tabIcon: Person,
          marginedTab: true,
          tabContent: (
            <span>
              <p>
                Individual monthly plan for ${plan.amount}. Allows streaming for
                only 1 session.
              </p>
            </span>
          )
        };
      }
      return {
        tabButton: "Group",
        tabIcon: Group,
        marginedTab: true,
        tabContent: (
          <span>
            <p>
              Group monthly plan for ${plan.amount}. Allows streaming for{" "}
              {plan.maximumSize} simultaneous sessions.
            </p>
          </span>
        )
      };
    });

    return (
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h3>
              <small>Choose Your Plan:</small>
            </h3>
          </div>
          <NavPillsModded
            active={this.state.planSelected}
            setValCallBack={this.setPlan}
            color="primary"
            tabs={tabs}
          />
        </div>
      </div>
    );
  };

  updateShowing = () => {
    var current = this.state.activeStep + 1;
    current %= 2;
    this.setState({ activeStep: current });
  };

  onSubmit = async (createSubscriptionAccount, values) => {
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
      username: "",
      isConnectedAccount: true
    };

    this.setState({ submitted: true });
    try {
      await createSubscriptionAccount({ variables });
      this.props.triggerSnackbar(
        "Subscribed! A new subscription was added to your dashboard."
      );
      mixpanel.track("Connect Attempt Successful", {
        service: this.getServiceName()
      });
    } catch {
      this.props.triggerSnackbar(
        "Sorry, an additional subscription account could not be created."
      );
      mixpanel.track("Connect Attempt Unsuccessful", {
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
    var isUsingGen = this.state.isGeneratedPassword;
    if (isUsingGen) return this.state.generatedPassword;
    return this.state.ownPassword;
  };

  render() {
    const { classes } = this.props;
    var isGenDisabled = this.state.isGenerateDisabled;
    var generatedPassword = this.state.generatedPassword;
    var isShowingFirst = "none";
    var activeStep = this.state.activeStep;
    if (activeStep == 0) {
      isShowingFirst = "initial";
    }
    return (
      <Mutation
        mutation={CREATE_SUBSCRIPTION_ACCOUNT}
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
                            <CardHeader color="primary">
                              <h4 className={classes.cardTitleWhite}>
                                Connect Your Subscription Account
                              </h4>
                              <p className={classes.cardCategoryWhite}>
                                Connect an existing account to Anorak.
                              </p>
                            </CardHeader>

                            {this.subscriptionSection(classes)}

                            {!this.state.isExisting &&
                              this.planSection(classes)}

                            {this.loginSection(
                              classes,
                              isGenDisabled,
                              generatedPassword
                            )}
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
                                password={this.getPassword()}
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
                      color="primary"
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
const ConnectContent = withSnackbar(_ConnectContent);

function Connect(props) {
  const { classes } = props;

  return (
    <Query query={SUBSCRIPTION_SERVICES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const services = data.subscriptionServices;
        return <ConnectContent classes={classes} services={services} />;
      }}
    </Query>
  );
}

Connect.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(pillsStyle)(Connect);
