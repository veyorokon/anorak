import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';

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
    marginBottom: 32
  }
});

const CustomInputComponent = ({ field, form, ...props }) => (
  <TextField id={field.name} {...field} {...props} />
);

class BillingSection extends React.Component {
  onSubmit = values => {
    console.log(values);
  };

  renderField = (name, label, other = {}) => (
    <Field
      component={CustomInputComponent}
      fullWidth
      label={label}
      name={name}
      required
      {...other}
    />
  );

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" gutterBottom>
          Billing
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          How you pay for subscriptions.
        </Typography>

        <Formik
          initialValues={{
            cardName: '',
            cardNumber: '',
            cvv: '',
            expDate: '',

            address1: '',
            address2: '',
            city: '',
            country: '',
            firstName: '',
            lastName: '',
            state: '',
            zip: ''
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await this.onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.topForm}>
                <Typography variant="h6">Credit card</Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12} md={6}>
                    {this.renderField('cardName', 'Name on card')}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {this.renderField('cardNumber', 'Card number')}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {this.renderField('expDate', 'Expiry date')}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {this.renderField('cvv', 'CVV', {
                      helperText: 'Last three digits on signature strip'
                    })}
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h6">Billing adddress</Typography>
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
                <Grid item xs={12} sm={6}>
                  {this.renderField('zip', 'Zip / Postal code', {
                    autoComplete: 'billing postal-code'
                  })}
                </Grid>
                <Grid item xs={12} sm={6}>
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
            </Form>
          )}
        </Formik>
      </Paper>
    );
  }
}

BillingSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BillingSection);
