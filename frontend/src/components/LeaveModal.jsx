import React from 'react';
import { withMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { GET_USER } from './SquadList';

var mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

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
    open: false,
    isSubmitting: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onYesClick = async deactivateMembership => {
    this.setState({ isSubmitting: true });
    await deactivateMembership({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadID
      }
    });
    mixpanel.track('Squad Membership Deactivate', {
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
          Leave
        </Button>
        <Dialog
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
            <Mutation
              mutation={DEACTIVATE_MEMBERSHIP}
              awaitRefetchQueries
              refetchQueries={[
                {
                  query: GET_USER,
                  variables: {
                    token: window.localStorage.getItem('sessionToken')
                  }
                }
              ]}
            >
              {deactivateMembership => (
                <Button
                  onClick={() => this.onYesClick(deactivateMembership)}
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
