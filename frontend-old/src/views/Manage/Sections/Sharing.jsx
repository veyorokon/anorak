import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import { Mutation } from "react-apollo";
import { USER } from "lib/queries";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";

import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Avatar from "@material-ui/core/Avatar";

import { INVITE_SUBSCRIPTION_ACCOUNT, DELETE_INVITE } from "lib/mutations";
import Form from "components/material-dashboard/Form/Form";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";

import { getToken } from "lib/utility.jsx";

class _SharingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      subscriptionAccountKey: subscriptionAccountKey,
      recipientEmail: this.state.inviteEmail
    };
    await createInvite({ variables });
    this.setState({ submitted: false, inviteEmail: "" });
    this.props.triggerSnackbar("Invite successfully sent.");
  };

  handleDelete = async (invitation, deleteInvite) => {
    var subscriptionInviteKey = invitation.id;
    const variables = {
      token: getToken(),
      subscriptionInviteKey: subscriptionInviteKey
    };
    await deleteInvite({ variables });
    this.props.triggerSnackbar("Invite deleted.");
  };

  render() {
    const { user, account } = this.props;
    const isUserOwner = user.email == account.responsibleUser.email;
    return (
      <div>
        <GridContainer>
          {account.subscribers.map(subscriptionMember => {
            var status = "Member";
            if (
              subscriptionMember.user.email == account.responsibleUser.email
            ) {
              status = "Owner";
            }
            return (
              <GridItem key={subscriptionMember.id} xs={12} sm={12} md={12}>
                <CustomInput
                  labelText={status}
                  id={subscriptionMember.id}
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

          {isUserOwner && (
            <GridItem xs={12} sm={12} md={12}>
              <h5>Invites</h5>
              {account.invites.map(invitation => {
                if (!invitation.processed) {
                  return (
                    <Mutation
                      key={invitation.id}
                      mutation={DELETE_INVITE}
                      refetchQueries={[
                        {
                          query: USER,
                          variables: {
                            token: getToken()
                          }
                        }
                      ]}
                    >
                      {deleteInvite => (
                        <Chip
                          style={{ margin: "3px" }}
                          label={invitation.recipientEmail}
                          color="primary"
                          onDelete={() =>
                            this.handleDelete(invitation, deleteInvite)
                          }
                          avatar={
                            <Avatar>
                              <FaceIcon />
                            </Avatar>
                          }
                          variant="outlined"
                        />
                      )}
                    </Mutation>
                  );
                }
              })}
            </GridItem>
          )}

          {isUserOwner && (
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
                          {text}
                        </Button>
                      );
                    }}
                  </Form>
                )}
              </Mutation>
            </GridItem>
          )}
        </GridContainer>
      </div>
    );
  }
}

const SharingContent = withSnackbar(_SharingContent);

function Sharing(props) {
  return <SharingContent {...props} />;
}

export default Sharing;
