import React from 'react';
import { withMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { SEARCH_SQUADS } from '../pages/Dashboard/SquadSearch';

const mixpanel = require('mixpanel-browser');
mixpanel.init('3800b7f2e3b6602f2bd7ee5c6e5dac42', { debug: true, verbose: 1 });

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
    open: false,
    isSubmitting: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onAcceptClick = async handleInvite => {
    this.setState({ isSubmitting: true });
    await handleInvite({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadID
      }
    });
    mixpanel.track('Squad Invite Accept', { squad: this.props.squadID });
    setTimeout(() => {
      this.setState({ open: false }, () => {
        this.props.onSuccess();
      });
    }, 600);
  };

  render() {
    return (
      <div>
        <Button style={{ color: 'green' }} onClick={this.handleClickOpen}>
          Accept
        </Button>
        <Dialog
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
            <Mutation
              mutation={HANDLE_INVITE}
              awaitRefetchQueries
              refetchQueries={[
                {
                  query: SEARCH_SQUADS,
                  variables: {
                    text: '',
                    token: window.localStorage.getItem('sessionToken')
                  }
                }
              ]}
            >
              {handleInvite => (
                <Button
                  onClick={() => this.onAcceptClick(handleInvite)}
                  color="secondary"
                  disabled={this.state.isSubmitting}
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
