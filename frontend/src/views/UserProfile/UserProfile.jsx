import React from "react";
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
import { CardElement, injectStripe } from "react-stripe-elements";
import { stripeAPIKey, getToken } from "lib/utility.jsx";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { USER, CUSTOMER } from "lib/queries";
import { SET_STRIPE_CARD, UPDATE_USER } from "lib/mutations";
import Form from "components/material-dashboard/Form/Form";
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
const createOptions = () => {
  return {
    style: {
      base: {
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "inherit",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class _CardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };
  }

  componentDidMount() {
    mixpanel.track("Account Page Load");
  }

  onSubmit = async (setStripeCard, values) => {
    const name_on_card = this.props.valueQuery("name_on_card");
    const address_line1 = this.props.valueQuery("address_line1");
    const address_line2 = this.props.valueQuery("address_line2");
    const address_city = this.props.valueQuery("address_city");
    const address_state = this.props.valueQuery("address_state");
    const address_country = this.props.valueQuery("address_country");
    const last4 = this.props.valueQuery("last4");

    const { token } = await this.props.stripe.createToken({
      address_line1: address_line1,
      address_line2: address_line2,
      address_city: address_city,
      address_state: address_state,
      address_country: address_country
    });
    const { data } = await setStripeCard({
      variables: {
        token: getToken(),
        cardToken: token.id,
        nameOnCard: name_on_card
      }
    });
    // Add mixpanel here
    this.setState({ submitted: true });
    mixpanel.track("Account Billing Update");
    this.props.triggerSnackbar("Your billing information was updated.");
  };

  render() {
    return (
      <Mutation mutation={SET_STRIPE_CARD}>
        {setStripeCard => (
          <Form
            onSubmit={async (values, { setSubmitting }) => {
              await this.onSubmit(setStripeCard);
              setTimeout(() => {
                setSubmitting(false);
              }, 600);
            }}
          >
            {({ isSubmitting }) => {
              var color = "info";
              var text = "Update Billing";
              var last4 = this.props.valueQuery("last4");
              var label_text = "You don't have an active card";
              if (last4) {
                label_text = "Your current card ends in: " + last4;
              }
              if (this.state.submitted) {
                color = "success";
                text = "Success";
              }
              return (
                <div>
                  <GridItem
                    style={{
                      border: "solid #000",
                      borderWidth: " 0 1px",
                      marginBottom: "15px"
                    }}
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    <p>
                      Would you like to update your card?{" "}
                      <label>{label_text}</label>
                    </p>

                    <CardElement {...createOptions()} />
                  </GridItem>
                  <Button
                    style={{ marginLeft: "-12px", marginBottom: "-12px" }}
                    color={color}
                    disabled={isSubmitting || this.state.submitted}
                    type="submit"
                  >
                    {text}
                  </Button>
                </div>
              );
            }}
          </Form>
        )}
      </Mutation>
    );
  }
}
const CardForm = injectStripe(withSnackbar(_CardForm));

class _UserProfileContent extends React.Component {
  constructor(props) {
    super(props);
    var user = this.props.user;
    var customer = this.props.customer;

    var nameOnCard = "";
    if (
      customer.default_source &&
      customer.default_source.metadata.name_on_card
    ) {
      nameOnCard = customer.default_source.metadata.name_on_card;
      this.state = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        name_on_card: nameOnCard,
        address_line1: customer.default_source.address_line1,
        address_line2: customer.default_source.address_line2,
        address_city: customer.default_source.address_city,
        address_state: customer.default_source.address_state,
        address_country: customer.default_source.address_country,
        last4: customer.default_source.last4,
        submitted: false,
        updatedProfile: false
      };
    } else {
      this.state = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        name_on_card: nameOnCard,
        address_line1: "",
        address_line2: "",
        address_city: "",
        address_state: "",
        address_country: "",
        last4: "",
        submitted: false,
        updatedProfile: false
      };
    }
  }

  onChangeHandler = event => {
    var obj = {};
    obj[event.target.id] = event.target.value;
    obj.updatedProfile = true;
    this.setState(obj);
  };

  getAddressVal = key => {
    if (this.state[key] === null) {
      return "";
    }
    return this.state[key];
  };

  onSubmit = async updateUser => {
    const variables = {
      token: getToken(),
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    await updateUser({ variables });
    this.setState({ submitted: true });
    this.props.triggerSnackbar("Your profile has been updated.");
  };

  render() {
    const { classes } = this.props;
    const firstName = this.getAddressVal("firstName");
    const lastName = this.getAddressVal("lastName");
    const email = this.getAddressVal("email");
    const name_on_card = this.getAddressVal("name_on_card");
    const address_line1 = this.getAddressVal("address_line1");
    const address_line2 = this.getAddressVal("address_line2");
    const address_city = this.getAddressVal("address_city");
    const address_state = this.getAddressVal("address_state");
    const address_country = this.getAddressVal("address_country");
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Mutation
              mutation={UPDATE_USER}
              refetchQueries={[
                {
                  query: USER,
                  variables: {
                    token: getToken()
                  }
                }
              ]}
            >
              {updateUser => (
                <Form
                  onSubmit={async (values, { setSubmitting }) => {
                    await this.onSubmit(updateUser, values);
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 600);
                  }}
                >
                  {({ isSubmitting }) => {
                    var color = "info";
                    var text = "Save Changes";
                    if (this.state.submitted) {
                      color = "success";
                      text = "Success";
                    }
                    return (
                      <Card>
                        <CardHeader color="info">
                          <h4 className={classes.cardTitleWhite}>
                            User Profile
                          </h4>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={6} md={12}>
                              <CustomInput
                                labelText="First Name"
                                id="firstName"
                                onChange={this.onChangeHandler}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  value: firstName
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={12}>
                              <CustomInput
                                labelText="Last Name"
                                id="lastName"
                                onChange={this.onChangeHandler}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  value: lastName
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <CustomInput
                                labelText="Email"
                                id="email"
                                formControlProps={{
                                  fullWidth: true,
                                  disabled: true
                                }}
                                inputProps={{
                                  value: email
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                        <CardFooter>
                          <Button
                            color={color}
                            disabled={
                              isSubmitting ||
                              this.state.submitted ||
                              !this.state.updatedProfile
                            }
                            type="submit"
                          >
                            {text}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  }}
                </Form>
              )}
            </Mutation>
          </GridItem>

          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Billing</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Name On Card"
                      id="name_on_card"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: name_on_card
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address Line 1"
                      id="address_line1"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address_line1
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address Line 2"
                      id="address_line2"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address_line2
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="City"
                      id="address_city"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address_city
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="State"
                      id="address_state"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address_state
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Country"
                      id="address_country"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address_country
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridItem xs={12} sm={12} md={12}>
                  <Elements>
                    <CardForm valueQuery={key => this.getAddressVal(key)} />
                  </Elements>
                </GridItem>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const UserProfileContent = withSnackbar(_UserProfileContent);

function UserProfileWithUser(props) {
  const classes = { props };
  return (
    <Query
      query={USER}
      variables={{ token: getToken() }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <StripeProvider apiKey={stripeAPIKey}>
            <UserProfileContent
              user={data.user}
              customer={props.customer}
              classes={classes}
            />
          </StripeProvider>
        );
      }}
    </Query>
  );
}

function UserProfile(props) {
  const { classes } = props;
  return (
    <Query
      query={CUSTOMER}
      variables={{ token: getToken() }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const customer = JSON.parse(data.customer);
        return <UserProfileWithUser customer={customer} />;
      }}
    </Query>
  );
}
export default withStyles(styles)(UserProfile);
