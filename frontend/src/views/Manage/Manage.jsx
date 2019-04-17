import React from "react";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { Query, Mutation } from "react-apollo";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { USER } from "lib/queries";
import {
  REQUEST_ACCOUNT_CANCELLATION,
  CONFIRM_SUBSCRIPTION_CONNECT,
  DELETE_SUBSCRIPTION_ACCOUNT,
  UPDATE_SUBSCRIPTION_ACCOUNT
} from "lib/mutations";

import { ACCOUNT_CREDENTIALS } from "lib/queries";

import { getToken, isAccountConfirmationNeeded } from "lib/utility.jsx";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import Overview from "./Sections/Overview";
import Connect from "./Sections/Connect";
import Account from "./Sections/Account";
import Sharing from "./Sections/Sharing";

import Button from "components/material-dashboard/CustomButtons/Button.jsx";

import AddBox from "@material-ui/icons/AddBox";
import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import Form from "components/material-dashboard/Form/Form";
import { mixpanel } from "lib/utility.jsx";

class _ManageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      cancelClicked: false,
      deleteClicked: false,
      submitted: false,
      confirmClicked: false,
      updateCredentialsClicked: false,
      updateSubmitted: false,
      updatedPassword: ""
    };
  }

  componentDidMount() {
    mixpanel.track("Manage Page Load", {
      subscription: this.getValue("subscriptionService").name
    });
  }

  getValue = key => {
    const account = this.props.account;
    return account[key];
  };

  onUpdate = async updateAccount => {
    var subscriptionAccountKey = this.props.account.id;
    const variables = {
      token: getToken(),
      subscriptionAccountKey: subscriptionAccountKey,
      password: this.state.updatedPassword
    };
    await updateAccount({ variables }).then(data => console.log(data));
    this.setState({ updateSubmitted: true });
    this.props.triggerSnackbar("You updated your account.");
  };

  onSubmit = async requestCancellation => {
    var subscriptionAccountKey = this.props.account.id;
    const variables = {
      token: getToken(),
      subscriptionAccountKey: subscriptionAccountKey
    };
    await requestCancellation({ variables });
    this.setState({ submitted: true });
    this.props.triggerSnackbar("Your cancellation request has been sent.");
  };

  onDelete = async requestDelete => {
    var subscriptionAccountKey = this.props.account.id;
    const variables = {
      token: getToken(),
      subscriptionAccountKey: subscriptionAccountKey
    };
    await requestDelete({ variables });
    this.props.history.push("/dashboard/home");
    this.props.triggerSnackbar("Account deleted.");
  };

  confirmSubmit = async confirmSubscriptionConnect => {
    var accountKey = this.props.account.id;
    const variables = {
      token: getToken(),
      subscriptionAccountKey: accountKey
    };
    await confirmSubscriptionConnect({ variables });
    this.setState({ submitted: true });
    this.props.triggerSnackbar("You've succesfully connected your account.");
  };

  passwordUpdate = e => {
    this.setState({
      updatedPassword: e.target.value
    });
  };

  renderConfirm = () => {
    const { classes } = this.props;

    return (
      <div>
        <Card>
          <div className={classes.container}>
            <div className={classes.title}>
              <h3>
                <small id="confirmName">
                  Confirm Your {this.getValue("subscriptionService").name}{" "}
                  Account
                </small>
              </h3>
            </div>
            <CardBody>
              <Connect getValue={this.getValue} />
            </CardBody>
            <CardFooter style={{ margin: "auto", marginBottom: "15px" }}>
              {!this.state.cancelClicked ? (
                <Button
                  color="success"
                  onClick={() => this.setState({ cancelClicked: true })}
                >
                  <span>Confirm</span>
                </Button>
              ) : (
                <Mutation
                  mutation={CONFIRM_SUBSCRIPTION_CONNECT}
                  refetchQueries={[
                    {
                      query: USER,
                      variables: {
                        token: getToken()
                      }
                    }
                  ]}
                >
                  {confirmSubscriptionConnect => (
                    <Form
                      onSubmit={async (values, { setSubmitting }) => {
                        await this.confirmSubmit(confirmSubscriptionConnect);
                        setTimeout(() => {
                          setSubmitting(false);
                        }, 600);
                      }}
                    >
                      {({ isSubmitting }) => {
                        var text = "Request Sent";
                        if (!this.state.submitted)
                          text = "Connect Your Subscription?";
                        return (
                          <Button
                            disabled={isSubmitting || this.state.submitted}
                            color="primary"
                            type="submit"
                          >
                            <span>{text}</span>
                          </Button>
                        );
                      }}
                    </Form>
                  )}
                </Mutation>
              )}
            </CardFooter>
          </div>
        </Card>
      </div>
    );
  };

  renderManage = () => {
    const { classes, user, account } = this.props;
    var cancelMutation = <span />;
    if (user.isMember) {
      if (!this.state.cancelClicked) {
        cancelMutation = (
          <Button onClick={() => this.setState({ cancelClicked: true })}>
            <span>Cancel</span>
          </Button>
        );
      } else {
        cancelMutation = (
          <Mutation
            mutation={REQUEST_ACCOUNT_CANCELLATION}
            refetchQueries={[
              {
                query: USER,
                variables: {
                  token: getToken()
                }
              }
            ]}
          >
            {requestCancellation => (
              <Form
                onSubmit={async (values, { setSubmitting }) => {
                  await this.onSubmit(requestCancellation);
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 600);
                }}
              >
                {({ isSubmitting }) => {
                  var text = "Request Sent";
                  if (!this.state.submitted) text = "Are You Sure?";
                  return (
                    <Button
                      disabled={isSubmitting || this.state.submitted}
                      color="danger"
                      type="submit"
                    >
                      <span>{text}</span>
                    </Button>
                  );
                }}
              </Form>
            )}
          </Mutation>
        );
      }
    }
    return (
      <div>
        <React.Fragment>
          <h3>{account.subscriptionService.name}</h3>
          <Card>
            <div className={classes.container}>
              <div id="sharing">
                <div className={classes.title}>
                  <h3>
                    <small>Members</small>
                  </h3>
                </div>

                <CardFooter>
                  <Sharing account={account} user={user} />
                </CardFooter>
              </div>
            </div>
          </Card>

          <Card>
            <div className={classes.container}>
              <div id="navigation-pills">
                <div className={classes.title}>
                  <h3>
                    <small>{account.subscriptionService.name} Account</small>
                  </h3>
                </div>
                <CardBody>
                  <Account user={user} account={account} />
                  {user.email == account.responsibleUser.email && (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          password
                          labelText="Update Password"
                          id="password"
                          type={"password"}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: this.state.updatedPassword,
                            id: "password"
                          }}
                          onChange={this.passwordUpdate}
                        />
                      </GridItem>
                    </GridContainer>
                  )}
                </CardBody>
                {user.email == account.responsibleUser.email && (
                  <CardFooter style={{ margin: "auto", marginBottom: "15px" }}>
                    {!this.state.updateCredentialsClicked ? (
                      <span>
                        <Button
                          color="primary"
                          onClick={() =>
                            this.setState({
                              updateCredentialsClicked: true
                            })
                          }
                        >
                          <span>Update</span>
                        </Button>
                      </span>
                    ) : (
                      <Mutation
                        mutation={UPDATE_SUBSCRIPTION_ACCOUNT}
                        refetchQueries={[
                          {
                            query: ACCOUNT_CREDENTIALS,
                            variables: {
                              token: getToken(),
                              subscriptionAccountKey: account.id
                            }
                          }
                        ]}
                      >
                        {updateAccount => (
                          <Form
                            onSubmit={async (values, { setSubmitting }) => {
                              await this.onUpdate(updateAccount);
                              setTimeout(() => {
                                setSubmitting(false);
                              }, 600);
                            }}
                          >
                            {({ isSubmitting }) => {
                              var text = "Success";
                              var color = "danger";

                              if (!this.state.updateSubmitted) {
                                text = "Update login?";
                              } else if (this.state.updateSubmitted) {
                                color = "success";
                              }
                              return (
                                <Button
                                  disabled={
                                    isSubmitting || this.state.updateSubmitted
                                  }
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
                    )}
                  </CardFooter>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className={classes.container}>
              <div id="navigation-pills">
                <div className={classes.title}>
                  <h3>
                    <small>{account.subscriptionService.name} Plan</small>
                  </h3>
                </div>
                <CardBody>
                  <Overview getValue={this.getValue} />
                </CardBody>

                <CardFooter style={{ margin: "auto", marginBottom: "15px" }}>
                  {cancelMutation}
                  {!this.state.deleteClicked ? (
                    <Button
                      color="primary"
                      onClick={() => this.setState({ deleteClicked: true })}
                    >
                      {user.email == account.responsibleUser.email ? (
                        <span>Delete</span>
                      ) : (
                        <span>Leave</span>
                      )}
                    </Button>
                  ) : (
                    <Mutation
                      mutation={DELETE_SUBSCRIPTION_ACCOUNT}
                      refetchQueries={[
                        {
                          query: USER,
                          variables: {
                            token: getToken()
                          }
                        }
                      ]}
                    >
                      {requestDelete => (
                        <Form
                          onSubmit={async (values, { setSubmitting }) => {
                            await this.onDelete(requestDelete);
                            setTimeout(() => {
                              setSubmitting(false);
                            }, 600);
                          }}
                        >
                          {({ isSubmitting }) => {
                            var text = "Request Sent";
                            if (!this.state.submitted)
                              text = "Delete subscription?";
                            return (
                              <Button
                                disabled={isSubmitting || this.state.submitted}
                                color="danger"
                                type="submit"
                              >
                                <span>{text}</span>
                              </Button>
                            );
                          }}
                        </Form>
                      )}
                    </Mutation>
                  )}
                </CardFooter>
              </div>
            </div>
          </Card>
        </React.Fragment>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    var requiresConfirmation = isAccountConfirmationNeeded(
      this.getValue("statusAccount")
    );

    if (requiresConfirmation) {
      return this.renderConfirm();
    }
    return this.renderManage();
  }
}

const ManageContent = withSnackbar(withRouter(_ManageContent));

function getAccountID(path) {
  return path.substr(path.lastIndexOf("/") + 1);
}

function getAccount(path, dashboardAccounts) {
  const accountID = getAccountID(path);
  for (var i = 0; i < dashboardAccounts.length; i++) {
    if (dashboardAccounts[i].id == accountID) return dashboardAccounts[i];
  }
  return null;
}

function Manage(props) {
  const { classes } = props;

  return (
    <Query query={USER} variables={{ token: getToken() }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const path = props.location.pathname;
        const dashboardAccounts = data.user.dashboardAccounts;
        const joinedAccounts = data.user.joinedAccounts;
        const accounts = joinedAccounts.concat(dashboardAccounts);
        const account = getAccount(path, accounts);
        return (
          <ManageContent user={data.user} account={account} classes={classes} />
        );
      }}
    </Query>
  );
}

export default withStyles(pillsStyle)(withRouter(Manage));
