import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import { ACCOUNT_CREDENTIALS } from "lib/queries";
import { Query } from "react-apollo";

import { getToken } from "lib/utility.jsx";

class AccountContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelClicked: false,
      submitted: false
    };
  }

  render() {
    const { account, user, credentials } = this.props;
    const username = credentials.username;
    var password = credentials.password;
    var passwordType = "password";
    if (password === "") {
      password = "You haven't set a password yet";
      passwordType = null;
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Username"
              id="username"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: username
              }}
            />
          </GridItem>
          {password ? (
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                password
                labelText="Password"
                id="oldpass"
                type={passwordType}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{ disabled: true, value: password }}
              />
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Password"
                id="oldpass"
                type={passwordType}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{ disabled: true, value: password }}
              />
            </GridItem>
          )}
        </GridContainer>
      </div>
    );
  }
}

function Account(props) {
  const { user, account } = props;

  return (
    <Query
      query={ACCOUNT_CREDENTIALS}
      variables={{ token: getToken(), subscriptionAccountKey: account.id }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <AccountContent
            credentials={data.accountCredentials}
            user={user}
            account={account}
          />
        );
      }}
    </Query>
  );
}

export default Account;
