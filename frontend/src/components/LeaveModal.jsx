import React from 'react';
import { withMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const DEACTIVATE_MEMBERSHIP = gql`
  mutation DeactivateMembership($token: String!, $squadID: Int!) {
    deactivateMembership(token: $token, squadID: $squadID) {
      squadMembership {
        id
        status
      }
    }
  }
`;

class LeaveModal extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = async client => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onYesClick = async deactivateMembership => {
    await deactivateMembership({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadID
      }
    });
  };

  render() {
    return (
      <div>
        <Button style={{ color: 'grey' }} onClick={this.handleClickOpen}>
          Leave
        </Button>
        <Dialog
          // fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Are you sure that you want to leave this squad?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              close
            </Button>
            <Mutation mutation={DEACTIVATE_MEMBERSHIP}>
              {deactivateMembership => (
                <Button
                  onClick={() => this.onYesClick(deactivateMembership)}
                  color="primary"
                >
                  Yes
                </Button>
              )}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(LeaveModal);
