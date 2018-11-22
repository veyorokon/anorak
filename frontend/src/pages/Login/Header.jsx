import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  title: {
    marginTop: '12px',
    marginBottom: '20px'
  }
});

function Header(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h4" className={classes.title}>
        SquadUp
      </Typography>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
