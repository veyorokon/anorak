import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

import Logo from './Logo';

const styles = theme => ({
  createButton: {
    marginRight: 10
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

function Navbar(props) {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar} variant="dense">
        <div>
          <Button
            component={Link}
            to="/create"
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.createButton}
          >
            Create
          </Button>
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

        <Logo />

        <IconButton
          color="secondary"
          component={Link}
          to="/account"
          aria-label="Go to account page"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
