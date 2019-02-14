import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CardElement, injectStripe } from 'react-stripe-elements';

import withSnackbar from '../../../lib/withSnackbar';
import Form from '../../../lib/Form';
import formConfig from './form';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

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

const SET_STRIPE_CARD = gql`
  mutation SetStripeCard($token: String!, $cardToken: String!) {
    setStripeCard(token: $token, cardToken: $cardToken) {
      stripeCustomer {
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
    marginRight: 10,
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

class BillingSection extends React.Component {
  onSubmit = async (setStripeCard, values) => {
    const { token } = await this.props.stripe.createToken({
      name: `${values.firstName} ${values.lastName}`,
      address_line1: values.address1,
      address_line2: values.address2,
      address_city: values.city,
      address_state: values.state,
      address_country: values.country
    });
    // TODO: send stripe token as well
    const { data } = await setStripeCard({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        cardToken: token.id
      }
    });
    mixpanel.track('Billing Method Update');
    this.props.triggerSnackbar('Your billing information was updated.');
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h5" gutterBottom>
            Billing
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle1">
            How you pay for subscriptions.
          </Typography>

          <Mutation mutation={SET_STRIPE_CARD}>
            {setStripeCard => (
              <Form
                config={formConfig}
                onSubmit={async (values, { setSubmitting }) => {
                  await this.onSubmit(setStripeCard, values);
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 600);
                }}
              >
                {({ isSubmitting, renderField }) => (
                  <div>
                    <div className={classes.topForm}>
                      <Typography variant="h6">Credit card</Typography>
                      <div className={classes.stripeForm}>
                        <CardElement {...createOptions()} />
                      </div>
                    </div>

                    <Typography variant="subtitle1">Address</Typography>
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        {renderField('firstName', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {renderField('lastName', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12}>
                        {renderField('address1', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12}>
                        {renderField('address2', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {renderField('city', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {renderField('state', {
                          fullWidth: true
                        })}
                      </Grid>
                      {/* TODO: add proper country form */}
                      <Grid item xs={12}>
                        {renderField('country')}
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
                  </div>
                )}
              </Form>
            )}
          </Mutation>
        </Paper>
      </React.Fragment>
    );
  }
}

BillingSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectStripe(withStyles(styles)(withSnackbar(BillingSection)));
