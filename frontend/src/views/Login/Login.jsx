import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FacebookButton from  "components/material-dashboard/FacebookButton/FacebookButton.jsx";
import LoginForm from './Form';
import Header from './Header';
import {mixpanel} from "lib/utility";

mixpanel.track('Login Page Load');

const styles = theme => {
  const layoutWidth = 400;
  const layoutSideMargin = theme.spacing.unit * 3;
  return {
    layout: {
      width: layoutWidth,
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down(layoutWidth + layoutSideMargin * 2)]: {
        width: 'auto',
        marginLeft: layoutSideMargin,
        marginRight: layoutSideMargin
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      [theme.breakpoints.down(layoutWidth + layoutSideMargin * 2)]: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    overline: {
      marginTop: '28px'
    }
  };
};

function Login(props) {
  const { classes } = props;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Header />
        <FacebookButton text="Login via Facebook" />
        <Typography className={classes.overline}>
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
