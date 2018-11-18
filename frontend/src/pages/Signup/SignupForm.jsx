import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import Field from '../../lib/Field';

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
      this.props.history.push('/dashboard');
    } catch (e) {
      console.log(e);
      const errorType = e.message.includes('409')
        ? 'emailIsAlreadyRegisteredError'
        : 'otherError';
      this.setState({ [errorType]: true });
    }
  };

  renderField = (name, label, other = {}) => {
    return (
      <Field
        label={label}
        name={name}
        other={{
          ...other,
          margin: 'normal'
        }}
      />
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={CREATE_USER}>
        {createUser => (
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: ''
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await this.onSubmit(createUser, values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {this.renderField('firstName', 'First Name')}
                {this.renderField('lastName', 'Last Name')}
                {this.renderField('email', 'Email Address', {
                  autoComplete: 'email',
                  error: this.state.emailIsAlreadyRegisteredError,
                  helperText: this.state.emailIsAlreadyRegisteredError
                    ? 'It looks like this email address is already registered.'
                    : '',
                  type: 'email'
                })}
                {this.renderField('password', 'Password', {
                  autoComplete: 'current-password',
                  type: 'password'
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
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SignupForm));
