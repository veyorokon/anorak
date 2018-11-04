import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  grow: {
    flexGrow: 1
  }
});

function Navbar(props) {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Button variant="outlined" color="secondary" className={classes.button}>
          Create Squad
        </Button>
        <div className={classes.grow} />
        <Typography variant="h5" color="inherit" noWrap>
          Squad
        </Typography>
        <Typography
          variant="h5"
          color="secondary"
          noWrap
          className={classes.grow}
        >
          Up
        </Typography>
        <Button color="secondary" className={classes.button}>
          Account
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
