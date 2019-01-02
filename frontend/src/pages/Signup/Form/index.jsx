import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import Form from '../../../lib/Form';
import formConfig from './form';

const mixpanel = require('mixpanel-browser');
mixpanel.init('3800b7f2e3b6602f2bd7ee5c6e5dac42', { debug: true, verbose: 1 });

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const CREATE_USER = gql`
  mutation User(
    $email: String!
    $firstName: String
    $lastName: String
    $password: String
  ) {
    user(
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
    emailIsAlreadyRegisteredError: false,
    otherError: false
  };

  clearError = ev => {
    if (this.state.emailIsAlreadyRegisteredError) {
      this.setState({ emailIsAlreadyRegisteredError: false });
    }
  };

  onSubmit = async (createUser, values) => {
    try {
      const { data } = await createUser({
        variables: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password
        }
      });
      window.localStorage.setItem('sessionToken', data.user.token);
      mixpanel.identify(values.email);
      mixpanel.track('User Create');
      this.props.history.push('/dashboard');
    } catch (e) {
      console.log(e);
      const errorType = e.message.includes('409')
        ? 'emailIsAlreadyRegisteredError'
        : 'otherError';
      this.setState({ [errorType]: true });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={CREATE_USER}>
        {createUser => (
          <Form
            config={formConfig}
            onSubmit={async (values, { setSubmitting }) => {
              await this.onSubmit(createUser, values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, renderField }) => (
              <div>
                {renderField('firstName', {
                  margin: 'normal',
                  fullWidth: true
                })}
                {renderField('lastName', {
                  margin: 'normal',
                  fullWidth: true
                })}
                {renderField('email', {
                  margin: 'normal',
                  fullWidth: true,
                  error: this.state.emailIsAlreadyRegisteredError,
                  helperText: this.state.emailIsAlreadyRegisteredError
                    ? 'It looks like this email address is already registered.'
                    : ''
                })}
                {renderField('password', {
                  margin: 'normal',
                  fullWidth: true
                })}

                <Button
                  className={classes.submit}
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  type="submit"
                >
                  Sign Up
                </Button>

                {this.state.otherError && (
                  <Typography align="center" color="error" variant="subtitle2">
                    We're sorry, an error has occurred. Please try again.
                  </Typography>
                )}
              </div>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SignupForm));
