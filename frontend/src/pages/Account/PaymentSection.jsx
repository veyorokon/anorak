import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    marginBottom: 32
  }
});

const CustomInputComponent = ({ field, form, ...props }) => (
  <TextField id={field.name} {...field} {...props} />
);

class PaymentSection extends React.Component {
  onSubmit = values => {
    console.log(values);
  };

  renderField = (name, label, other = {}) => (
    <Field
      component={CustomInputComponent}
      fullWidth
      label={label}
      name={name}
      {...other}
    />
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

        <Formik
          initialValues={{
            cardNumber: '',

            accountNumber: '',
            routingNumber: ''
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await this.onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.topForm}>
                <Typography variant="h6">Debit card</Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    {this.renderField('cardNumber', 'Card number')}
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h6">Bank Account</Typography>
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

PaymentSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentSection);
