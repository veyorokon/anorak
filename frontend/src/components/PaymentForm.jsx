import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BankAccountForm from './BankAccountForm';
import DebitCardForm from './DebitCardForm';

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

class PaymentForm extends React.Component {
  onSubmit = () => {
    console.log('here');
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
        <form onSubmit={this.onSubmit}>
          <div className={classes.topForm}>
            <DebitCardForm />
          </div>
          <BankAccountForm />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
        </form>
      </Paper>
    );
  }
}

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentForm);
