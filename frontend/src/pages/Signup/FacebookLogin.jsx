import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FacebookProvider, LoginButton } from 'react-facebook';

const GET_FACEBOOK_USER = gql`
  mutation FacebookUser($email: String!, $facebookAccessToken: String!) {
    facebookUser(email: $email, facebookAccessToken: $facebookAccessToken) {
      token
    }
  }
`;

const styles = theme => ({
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
});

class FacebookLogin extends React.Component {
  handleResponse = (data, getFacebookUser) => {
    getFacebookUser({
      variables: {
        email: data.profile.email,
        facebookAccessToken: data.tokenDetail.accessToken
      }
    }).then(({ data }) => {
      window.localStorage.setItem('sessionToken', data.getFacebookUser.token);
      this.props.history.push('/dashboard');
    });
  };

  handleError = e => {
    console.log(e);
  };

  render() {
    return (
      <Mutation mutation={GET_FACEBOOK_USER}>
        {getFacebookUser => {
          return (
            <FacebookProvider appId="1974089579550206">
              <LoginButton
                className={this.props.classes.button}
                scope="email"
                onCompleted={data => this.handleResponse(data, getFacebookUser)}
                onError={this.handleError}
              >
                <span>Signup via Facebook</span>
              </LoginButton>
            </FacebookProvider>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(withRouter(FacebookLogin));
