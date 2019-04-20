import React from "react";
import { Query, Mutation } from "react-apollo";
import { SET_STRIPE_CARD } from "lib/mutations";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";
import { CardElement, injectStripe } from "react-stripe-elements";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import { getToken } from "lib/utility.jsx";
import Form from "components/material-dashboard/Form/Form";
import { CUSTOMER } from "lib/queries";

import { mixpanel } from "lib/utility.jsx";

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

class _CardFormContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };
  }

  onSubmit = async (setStripeCard, values) => {
    const customer = this.props.customer;
    const address_line1 = customer.shipping.address.line1;
    const address_line2 = customer.shipping.address.line2;
    const address_city = customer.shipping.address.city;
    const address_state = customer.shipping.address.state;
    const address_country = customer.shipping.address.country;

    const { token } = await this.props.stripe.createToken({
      name: "test name", //this.props.addressVal('name_on_card'),
      address_line1: address_line1,
      address_line2: address_line2,
      address_city: address_city,
      address_state: address_state,
      address_country: address_country
    });
    const { data } = await setStripeCard({
      variables: {
        token: getToken(),
        cardToken: token.id
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
              const customer = this.props.customer;
              console.log(customer);
              var color = "info";
              var text = "Update Billing";
              var last_four = customer.default_source.last4;
              var label_text = "You don't have an active card";
              if (last_four) {
                label_text = "Your current card ends in: " + last_four;
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
const CardFormContent = injectStripe(withSnackbar(_CardFormContent));

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Query
        query={CUSTOMER}
        variables={{ token: getToken() }}
        fetchPolicy="network-only"
      >
        {({ loading, error, customer }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return <CardFormContent customer={customer} />;
        }}
      </Query>
    );
  }
}

export default CardForm;
