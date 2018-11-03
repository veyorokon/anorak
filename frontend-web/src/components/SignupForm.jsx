import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  title: {
    marginTop: '12px',
    marginBottom: '12px'
  },
  subtitle: {
    marginBottom: '28px'
  },
  button: {
    marginBottom: '28px'
  }
});

function SignupForm(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h4" className={classes.title}>
        SquadUp
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        className={classes.subtitle}
      >
        Create your own subscription service and share it with family and
        friends or the SquadUp universe.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="small"
        className={classes.button}
      >
        <Icon className={classes.leftIcon}>facebook</Icon>
        Sign up with Facebook
      </Button>

      <Typography variant="overline" className={classes.overline}>
        Or
      </Typography>

      <form className={classes.form}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="fullName">Full Name</InputLabel>
          <Input id="fullName" name="fullName" autoComplete="email" />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" autoComplete="email" />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button
          fullWidth
          type="submit"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </Paper>
  );
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
