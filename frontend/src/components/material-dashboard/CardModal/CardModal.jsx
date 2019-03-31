import React from "react";
import PropTypes from "prop-types";
import { withMobileDialog } from "@material-ui/core";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { ACCOUNT_CREDENTIALS } from "lib/queries";
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";

class CardModal extends React.Component {
  state = {
    open: false,
    subscriptionAccountKey: this.props.subscriptionAccountKey,
    username: "",
    password: ""
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = async client => {
    const { data } = await client.query({
      fetchPolicy: "no-cache",
      query: ACCOUNT_CREDENTIALS,
      variables: {
        token: window.localStorage.getItem("sessionToken"),
        subscriptionAccountKey: this.state.subscriptionAccountKey
      }
    });
    if (data.accountCredentials) {
      this.setState({
        username: data.accountCredentials.username,
        password: data.accountCredentials.password,
        open: true
      });
    } else {
      this.setState({
        username: "You need an active membership...",
        password: "You need an active membership...",
        open: true
      });
    }
  };
  render() {
    const { fullScreen, color } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <Button onClick={() => this.handleOpen(client)} color="transparent">
              <span style={{ color: "white" }}>Account</span>
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="account-information"
            >
              <DialogTitle id="responsive-dialog-title">
                {this.props.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Username: {this.state.username}
                </DialogContentText>
                <DialogContentText>
                  Password: {this.state.password}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color={color}>
                  close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

CardModal.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  title: PropTypes.string.isRequired
};

export default CardModal;
