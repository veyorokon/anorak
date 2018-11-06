import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FacebookLogin from './FacebookLogin';
import api from '../lib/api';

const styles = theme => ({
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
  title: {
    marginTop: '12px',
    marginBottom: '12px'
  },
  subtitle: {
    marginBottom: '20px'
  },
  overline: {
    marginTop: '28px'
  }
});

class SignupForm extends React.Component {
  state = {
    email: '',
    fullName: '',
    password: ''
  };

  onChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    api
      .createUser({
        email: this.state.email,
        fullName: this.state.fullName,
        password: this.state.password
      })
      .then(data => {
        console.log(data);
      });
  };

  renderHeader = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        {this.renderHeader()}

        <FacebookLogin />

        <Typography variant="overline" className={classes.overline}>
          Or
        </Typography>

        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="fullName">Full Name</InputLabel>
            <Input id="fullName" name="fullName" onChange={this.onChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={this.onChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
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
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
