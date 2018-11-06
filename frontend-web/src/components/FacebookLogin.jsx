import React from 'react';
import api from '../lib/api';
import { withRouter } from 'react-router-dom';

window.callApiCreateUser = () => {
  window.FB.getLoginStatus(({ authResponse, status }) => {
    if (status === 'connected') {
      window.FB.api('/me', { fields: 'email,name' }, meResponse => {
        api
          .createFacebookUser({
            email: meResponse.email,
            facebookAccessToken: authResponse.accessToken,
            facebookUserId: authResponse.userID,
            fullName: meResponse.name
          })
          .then(data => {
            console.log(data);
            // PASS USER DATA HERE
            window.location = '/dashboard';
          });
      });
    }
  });
};

class FacebookLogin extends React.Component {
  render() {
    return (
      <div
        className="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-auto-logout-link="true"
        data-use-continue-as="false"
        data-onlogin="callApiCreateUser();"
        data-scope="public_profile,email"
      />
    );
  }
}

export default withRouter(FacebookLogin);
