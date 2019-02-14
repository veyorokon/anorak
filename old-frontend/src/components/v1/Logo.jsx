import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  logo: {
    display: 'flex'
  }
});

function Logo(props) {
  const { classes } = props;
  return (
    <div className={classes.logo} style={{ paddingRight: 20 }}>
      <Typography variant="h5" color="inherit" noWrap component={Link} to="/">
        Squad
      </Typography>
      <Typography variant="h5" color="secondary" noWrap component={Link} to="/">
        Up
      </Typography>
    </div>
  );
}

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);
