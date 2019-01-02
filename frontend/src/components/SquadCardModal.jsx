import React from 'react';
import PropTypes from 'prop-types';
import { withMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

const mixpanel = require('mixpanel-browser');
mixpanel.init('3800b7f2e3b6602f2bd7ee5c6e5dac42', { debug: true, verbose: 1 });

const GET_SECRET = gql`
  query GetSecret($token: String!, $membershipID: Int!) {
    getSecret(token: $token, membershipID: $membershipID)
  }
`;

class SquadCardModal extends React.Component {
  state = {
    open: false,
    secret: ''
  };

  handleClickOpen = async client => {
    const { data } = await client.query({
      fetchPolicy: 'no-cache',
      query: GET_SECRET,
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        membershipID: this.props.membershipID
      }
    });
    mixpanel.track('Squad Secret Request', { squad: this.props.squadID });
    this.setState({ secret: data.getSecret, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <Button
              style={{ color: '#138A36' }}
              onClick={() => this.handleClickOpen(client)}
            >
              Secret
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {this.props.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Decrypted: {this.state.secret}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
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

SquadCardModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(SquadCardModal);
