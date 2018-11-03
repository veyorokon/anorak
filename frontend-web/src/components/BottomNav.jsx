import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
});

function BottomNav(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="subtitle2" color="inherit">
          Dashboard
        </Typography>
        <Button
          variant="fab"
          color="secondary"
          aria-label="Add"
          className={classes.fabButton}
        >
          <AddIcon />
        </Button>
        <Typography variant="subtitle2" color="inherit">
          Account
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomNav);
