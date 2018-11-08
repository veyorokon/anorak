import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import BillingForm from '../components/BillingForm';
import Navbar from '../components/Navbar';
import PaymentForm from '../components/PaymentForm';
import SquadList from '../components/SquadList';

const styles = theme => ({
  content: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  left: {
    width: '20%',
    minWidth: 260,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 32,
    marginLeft: 16
  },
  leftTitle: {
    marginTop: 32,
    marginBottom: 6
  },
  right: {
    width: '80%',
    marginRight: 16
  },
  rightTitle: {
    marginTop: 32,
    marginBottom: 6,
    marginLeft: 22
  },
  forms: {
    display: 'flex',
    paddingTop: 8
  }
});

function Account(props) {
  const { classes } = props;

  return (
    <div>
      <Navbar search={<div>test</div>} />
      <div className={classes.content}>
        <div className={classes.left}>
          <Typography className={classes.leftTitle} align="center" variant="h6">
            Active Squads
          </Typography>
          <SquadList />
        </div>
        <div className={classes.right}>
          <Typography className={classes.rightTitle} align="left" variant="h6">
            Account
          </Typography>
          <div className={classes.forms}>
            <BillingForm />
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
