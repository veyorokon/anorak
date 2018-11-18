import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

class MutationByForm extends React.Component {
  render() {
    return (
      <Mutation mutation={this.props.mutation}>
        {createUser => (
          <Formik
            initialValues={this.props.initialValues}
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
MutationByForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  mutation: PropTypes.string.isRequired
};

export default MutationByForm;
