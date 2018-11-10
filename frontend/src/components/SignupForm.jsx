import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import FacebookLogin from './FacebookLogin';

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

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $firstName: String
    $lastName: String
    $password: String
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
    }
  }
`;

class SignupForm extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',

    emailIsAlreadyRegisteredError: false,
    otherError: false
  };

  onChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  clearError = ev => {
    if (this.state.emailIsAlreadyRegisteredError) {
      this.setState({ emailIsAlreadyRegisteredError: false });
    }
  };

  onSubmit = createUser => {
    createUser({
      variables: {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password
      }
    })
      .then(({ data }) => {
        window.localStorage.setItem('sessionToken', data.createUser.token);
        this.props.history.push('/dashboard');
      })
      .catch(e => {
        console.log(e);
        const errorType = e.message.includes('409')
          ? 'emailIsAlreadyRegisteredError'
          : 'otherError';
        this.setState({ [errorType]: true });
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

        <Mutation mutation={CREATE_USER}>
          {createUser => {
            return (
              <form
                className={classes.form}
                onSubmit={ev => {
                  ev.preventDefault();
                  this.onSubmit(createUser);
                }}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    onChange={this.onChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    onChange={this.onChange}
                  />
                </FormControl>
                <TextField
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  onChange={this.onChange}
                  onFocus={this.clearError}
                  fullWidth
                  required
                  error={this.state.emailIsAlreadyRegisteredError}
                  helperText={
                    this.state.emailIsAlreadyRegisteredError
                      ? 'It looks like this email address is already registered.'
                      : ''
                  }
                />
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
                {this.state.otherError && (
                  <Typography align="center" color="error" variant="subtitle2">
                    We're sorry, an error has occurred. Please try again.
                  </Typography>
                )}
              </form>
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SignupForm));
