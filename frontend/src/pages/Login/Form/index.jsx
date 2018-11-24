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

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

// TODO: change to login mutation
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

class LoginForm extends React.Component {
  state = {
    error: false
  };

  onSubmit = async (login, values) => {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password
        }
      });
      window.localStorage.setItem('sessionToken', data.loginUser.token);
      this.props.history.push('/dashboard');
    } catch (e) {
      console.log(e);
      this.setState({ error: true });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={LOGIN_USER}>
        {login => (
          <Form
            config={formConfig}
            onSubmit={async (values, { setSubmitting }) => {
              await this.onSubmit(login, values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, renderField }) => (
              <div>
                {renderField('email', {
                  margin: 'normal',
                  fullWidth: true
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
                  Login
                </Button>

                {this.state.error && (
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

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(LoginForm));
