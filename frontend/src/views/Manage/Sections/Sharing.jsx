import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import { Mutation } from "react-apollo";
import { USER } from "lib/queries";

import { INVITE_SUBSCRIPTION_ACCOUNT } from "lib/mutations";
import Form from "components/material-dashboard/Form/Form";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";

import { getToken } from "lib/utility.jsx";

class SharingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharingClicked: false,
      submitted: false,
      inviteEmail: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      inviteEmail: e.target.value
    });
  };

  onSubmit = async createInvite => {
    var subscriptionAccountKey = this.props.account.id;
    const variables = {
      token: getToken(),
      subscriptionAccountKey: subscriptionAccountKey
    };
    // await createInvite({ variables });
    this.setState({ submitted: true });
    // this.props.triggerSnackbar("Your cancellation request has been sent.");
  };

  render() {
    const { user, account } = this.props;

    return (
      <div>
        <GridContainer>
          {account.subscribers.map(subscriptionMember => {
            return (
              <GridItem key={subscriptionMember.id} xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Member"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                    disabled: true,
                    type: "email"
                  }}
                  inputProps={{
                    value: subscriptionMember.user.email
                  }}
                />
              </GridItem>
            );
          })}

          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Email"
              id="email"
              formControlProps={{
                fullWidth: true,
                type: "email"
              }}
              inputProps={{
                value: this.state.inviteEmail
              }}
              onChange={e => this.handleOnChange(e)}
            />

            <Mutation
              mutation={INVITE_SUBSCRIPTION_ACCOUNT}
              refetchQueries={[
                {
                  query: USER,
                  variables: {
                    token: getToken()
                  }
                }
              ]}
            >
              {createInvite => (
                <Form
                  onSubmit={async (values, { setSubmitting }) => {
                    await this.onSubmit(createInvite);
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 600);
                  }}
                >
                  {({ isSubmitting }) => {
                    var text = "Success";
                    var color = "primary";

                    if (!this.state.submitted) {
                      text = "Send Invite";
                    } else if (this.state.submitted) {
                      color = "success";
                    }
                    return (
                      <Button
                        disabled={isSubmitting || this.state.submitted}
                        color={color}
                        type="submit"
                      >
                        <span>{text}</span>
                      </Button>
                    );
                  }}
                </Form>
              )}
            </Mutation>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function Sharing(props) {
  const { user, account } = props;

  return <SharingContent account={account} user={user} />;
}

export default Sharing;
