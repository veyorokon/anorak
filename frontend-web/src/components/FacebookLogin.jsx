import React from 'react';
import api from '../lib/api';

window.checkLoginState = () => {
  window.FB.getLoginStatus(({ authResponse, status, ...other }) => {
    if (status === 'connected') {
      window.FB.api('/me', { fields: 'email,name' }, meResponse => {
        api.createUser({
          email: meResponse.email,
          facebookAccessToken: authResponse.accessToken,
          facebookUserId: authResponse.userID,
          fullName: meResponse.name
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
        data-onlogin="window.checkLoginState();"
        data-scope="public_profile,email"
      />
    );
  }
}

export default FacebookLogin;
