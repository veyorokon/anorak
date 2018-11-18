import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CardElement, injectStripe } from 'react-stripe-elements';

import Field from '../../lib/Field';

const createOptions = () => {
  return {
    style: {
      base: {
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

const SET_USER_SHIPPING_ADDRESS = gql`
  mutation ShippingAddress(
    $city: String!
    $line1: String!
    $line2: String
    $state: String!
    $token: String!
    $zip: Int!
  ) {
    shippingAddress(
      city: $city
      line1: $line1
      line2: $line2
      state: $state
      token: $token
      zip: $zip
    ) {
      address {
        id
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    },
    marginLeft: 10,
    flexBasis: '50%'
  },
  button: {
    marginTop: theme.spacing.unit * 3
  },
  subtitle: {
    marginBottom: 16
  },
  topForm: {
    marginBottom: 24
  },
  stripeForm: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  }
});

class PaymentSection extends React.Component {
  onSubmit = async (setUserShippingAddress, values) => {
    const { token } = await this.props.stripe.createToken({
      name: `${values.firstName} ${values.lastName}`,
      address_line1: values.address1,
      address_line2: values.address2,
      address_city: values.city,
      address_state: values.state,
      address_country: values.country
    });
    // TODO: send stripe token as well
    const { data } = await setUserShippingAddress({
      variables: {
        city: values.city,
        line1: values.address1,
        line2: values.address2,
        state: values.state,
        token: window.localStorage.getItem('sessionToken'),
        zip: token.card.address_zip
      }
    });
    console.log(data);
  };

  renderField = (name, label, other = {}) => (
    <Field label={label} name={name} {...other} />
  );

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" align="left" gutterBottom>
          Payment
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          How you get paid by squad members.
        </Typography>

        <Mutation mutation={SET_USER_SHIPPING_ADDRESS}>
          {setUserShippingAddress => (
            <Formik
              initialValues={{
                address1: '',
                address2: '',
                cardName: '',
                city: '',
                country: '',
                firstName: '',
                lastName: '',
                state: ''
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await this.onSubmit(setUserShippingAddress, values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={classes.topForm}>
                    <Typography variant="h6">Debit card</Typography>
                    <div className={classes.stripeForm}>
                      <CardElement {...createOptions()} />
                    </div>
                  </div>

                  <Typography variant="subtitle1">Address</Typography>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      {this.renderField('firstName', 'First name', {
                        autoComplete: 'fname'
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {this.renderField('lastName', 'Last name', {
                        autoComplete: 'lname'
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {this.renderField('address1', 'Address 1', {
                        autoComplete: 'billing address-line1'
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {this.renderField('address2', 'Address 2', {
                        autoComplete: 'billing address-line2',
                        required: false
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {this.renderField('city', 'City', {
                        autoComplete: 'billing address-level2'
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {this.renderField('state', 'State')}
                    </Grid>
                    {/* TODO: add proper country form */}
                    <Grid item xs={12}>
                      {this.renderField('country', 'Country', {
                        autoComplete: 'billing country'
                      })}
                    </Grid>
                  </Grid>

                  <Button
                    className={classes.button}
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                  >
                    Save
                  </Button>

                  {/* <Typography variant="h6">Bank Account</Typography>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      {this.renderField(
                        'routingNumber',
                        'Routing or transit number'
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {this.renderField('accountNumber', 'Account number')}
                    </Grid>
                  </Grid> */}
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      </Paper>
    );
  }
}

PaymentSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectStripe(withStyles(styles)(PaymentSection));
