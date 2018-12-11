import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  notLoggedInSection: {
    display: 'flex',
    alignItems: 'baseline'
  },
  orText: {
    color: 'white'
  }
});

function AccountButtons(props) {
  const { classes } = props;
  const userIsLoggedIn = !!window.localStorage.getItem('sessionToken');

  return userIsLoggedIn ? (
    <Button
      component={Link}
      to="/account"
      variant="text"
      color="secondary"
      size="small"
      className="dashboard-tutorial-fourth"
    >
      Account
    </Button>
  ) : (
    <div className={(classes.notLoggedInSection, 'dashboard-tutorial-fourth')}>
      <Button
        component={Link}
        to="/login"
        variant="text"
        color="secondary"
        size="small"
      >
        Login
      </Button>
      <Typography className={classes.orText} variant="subtitle2">
        or
      </Typography>
      <Button
        component={Link}
        to="/signup"
        variant="text"
        color="secondary"
        size="small"
      >
        Signup
      </Button>
    </div>
  );
}

export default withStyles(styles)(AccountButtons);
