import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SET_PREFERRED_PAYMENT_METHOD = gql`
  mutation PreferredPaymentMethod($paymentMethod: String!, $token: String!) {
    preferredPaymentMethod(paymentMethod: $paymentMethod, token: $token) {
      user {
        id
        paymentMethod
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
  firstOption: {
    marginBottom: -10
  }
});

const MaterialUiInputComponent = ({ field, form, ...props }) => (
  <RadioGroup id={field.name} {...field} {...props} />
);

class PaymentSection extends React.Component {
  onSubmit = async (preferredPaymentMethod, values) => {
    const { data } = await preferredPaymentMethod({
      variables: {
        paymentMethod: values.paymentMethod,
        token: window.localStorage.getItem('sessionToken')
      }
    });
    console.log(data);
  };

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

        <Mutation mutation={SET_PREFERRED_PAYMENT_METHOD}>
          {preferredPaymentMethod => (
            <Formik
              initialValues={{ paymentMethod: '' }}
              onSubmit={async (values, { setSubmitting }) => {
                await this.onSubmit(preferredPaymentMethod, values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <FormControl component="fieldset">
                        <Field
                          component={MaterialUiInputComponent}
                          name="paymentMethod"
                        >
                          <FormControlLabel
                            className={classes.firstOption}
                            value="paypal"
                            control={<Radio />}
                            label="PayPal"
                          />
                          <FormControlLabel
                            value="venmo"
                            control={<Radio />}
                            label="Venmo"
                          />
                        </Field>
                      </FormControl>
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

export default withStyles(styles)(PaymentSection);
