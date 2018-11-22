import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FacebookButton from '../../components/FacebookButton';
import LoginForm from './Form';
import Header from './Header';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  overline: {
    marginTop: '28px'
  }
});

function Login(props) {
  const { classes } = props;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Header />
        <FacebookButton text="Login via Facebook" />
        <Typography variant="overline" className={classes.overline}>
          Or
        </Typography>
        <LoginForm />
      </Paper>
    </main>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
