import React from 'react';
import { withMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

const DEACTIVATE_SQUAD = gql`
  mutation DeactivateSquad($token: String!, $squadID: Int!) {
    deactivateSquad(token: $token, squadID: $squadID) {
      squad {
        id
      }
    }
  }
`;

class LeaveModal extends React.Component {
  state = {
    open: false,
    isSubmitting: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onYesClick = async deactivateSquad => {
    this.setState({ isSubmitting: true });
    await deactivateSquad({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadID
      }
    });
    mixpanel.track('Squad Deactivate', {
      squad: this.props.squadID
    });
    setTimeout(() => {
      this.setState({ open: false });
    }, 600);
  };

  render() {
    return (
      <div>
        <Button style={{ color: 'red' }} onClick={this.handleClickOpen}>
          Disband
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Are you sure that you want to disband this squad? This will
            terminate ALL active member subscriptions.
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              close
            </Button>
            <Mutation mutation={DEACTIVATE_SQUAD}>
              {deactivateSquad => (
                <Button
                  onClick={() => this.onYesClick(deactivateSquad)}
                  color="primary"
                  disabled={this.state.isSubmitting}
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
