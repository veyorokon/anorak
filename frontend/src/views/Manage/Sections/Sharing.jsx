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

class SharingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelClicked: false,
      submitted: false
    };
  }

  render() {
    const { user } = this.props;

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
                value: "empty"
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function Sharing(props) {
  const { user } = props;

  return (
    // <Query
    //   query={ACCOUNT_CREDENTIALS}
    //   variables={{ token: getToken(), subscriptionAccountKey: account.id }}
    // >
    //   {({ loading, error, data }) => {
    //     if (loading) return "Loading...";
    //     if (error) return `Error! ${error.message}`;
    //     return (
    <SharingContent user={user} />
    //     );
    //   }}
    // </Query>
  );
}

export default Sharing;
