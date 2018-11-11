import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddressForm from './AddressForm';
import BillingCardForm from './BillingCardForm';

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

class BillingSection extends React.Component {
  onSubmit = () => {
    console.log('here');
  };

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
        <form onSubmit={this.onSubmit}>
          <div className={classes.topForm}>
            <BillingCardForm />
          </div>
          <AddressForm />
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

BillingSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BillingSection);
