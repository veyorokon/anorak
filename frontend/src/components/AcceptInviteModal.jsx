import React from 'react';
import { withMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const HANDLE_INVITE = gql`
  mutation HandleInvite($token: String!, $squadID: Int!) {
    handleInvite(token: $token, squadID: $squadID, wasAccepted: true) {
      squadMembership {
        id
        status
      }
    }
  }
`;

class AcceptInviteModal extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = async client => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onAcceptClick = async handleInvite => {
    await handleInvite({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadID
      }
    });
  };

  render() {
    return (
      <div>
        <Button style={{ color: 'green' }} onClick={this.handleClickOpen}>
          Accept
        </Button>
        <Dialog
          // fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Confirm that you'd like to accept this invitation
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              close
            </Button>
            <Mutation mutation={HANDLE_INVITE}>
              {handleInvite => (
                <Button
                  onClick={() => this.onAcceptClick(handleInvite)}
                  color="secondary"
                >
                  Accept
                </Button>
              )}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(AcceptInviteModal);
