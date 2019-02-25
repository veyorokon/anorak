import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FacebookProvider, LoginButton } from 'react-facebook';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

const GET_FACEBOOK_USER = gql`
  mutation FacebookUser($email: String!, $facebookAccessToken: String!) {
    facebookUser(email: $email, facebookAccessToken: $facebookAccessToken) {
      token
    }
  }
`;

const styles = {
  button: {
    backgroundColor: '#4267b2',
    borderRadius: 4,
    borderWidth: 0,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 16,
    height: 40,
    outline: 'none',
    width: 254
  }
};

class FacebookButton extends React.Component {
  handleResponse = (data, facebookUser) => {
    facebookUser({
      variables: {
        email: data.profile.email,
        facebookAccessToken: data.tokenDetail.accessToken
      }
    }).then(({ data }) => {
      window.localStorage.setItem('sessionToken', data.facebookUser.token);
      mixpanel.identify(data.facebookUser.email);
      mixpanel.track('Facebook Auth Click');
      this.props.history.push('/dashboard/home');
    });
  };

  handleError = e => {
    console.log(e);
  };

  render() {
    return (
      <Mutation mutation={GET_FACEBOOK_USER}>
        {facebookUser => {
          return (
            <FacebookProvider appId="1974089579550206">
              <LoginButton
                className={this.props.classes.button}
                scope="email"
                onCompleted={data => this.handleResponse(data, facebookUser)}
                onError={this.handleError}
              >
                <span>{this.props.text}</span>
              </LoginButton>
            </FacebookProvider>
          );
        }}
      </Mutation>
    );
  }
}

FacebookButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default withStyles(styles)(withRouter(FacebookButton));
