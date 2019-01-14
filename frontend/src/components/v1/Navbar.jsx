import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import AccountButtons from './AccountButtons';
import Logo from './Logo';

const styles = theme => ({
  createButton: {
    marginLeft: 30,
    marginRight: 10
  },
  toolbar: {
    display: 'flex'
  },
  navbarLeft: {
    flexBasis: '23%',
    display: 'flex'
  },
  navbarRight: {
    borderLeft: '1px solid grey',
    paddingLeft: 40,
    display: 'flex',
    flexBasis: '77%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newText: {
    color: 'white'
  },
  startHereSection: {
    display: 'flex',
    alignItems: 'baseline'
  }
});

function Navbar(props) {
  const { classes } = props;
  const isDash = props.onStartClick;
  let tutorial = <div />;
  if (isDash) {
    tutorial = (
      <div className={classes.startHereSection}>
        <Typography className={classes.newText} variant="subtitle2">
          New?
        </Typography>
        <Button
          className="dashboard-tutorial-first"
          variant="text"
          color="secondary"
          size="small"
          onClick={() => props.onStartClick()}
        >
          Start here
        </Button>
      </div>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar} variant="dense">
        <div className={classes.navbarLeft}>
          <Logo />
          <Button
            component={Link}
            to="/create"
            variant="outlined"
            color="secondary"
            size="small"
            className={(classes.createButton, 'dashboard-tutorial-fourth')}
          >
            Create
          </Button>
          <div style={{ paddingRight: 20 }} />
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="secondary"
            size="small"
          >
            Discover
          </Button>
        </div>
        <div className={classes.navbarRight}>
          {tutorial}

          <AccountButtons />
        </div>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
