import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import AcceptInviteModal from './AcceptInviteModal';
import SquadUpModal from './SquadUpModal';

import gql from 'graphql-tag';

import { Mutation } from 'react-apollo';

const DISMISS_CARD = gql`
  mutation UpdateMembershipListing(
    $token: String!
    $membershipID: Int!
    $isListed: Boolean!
  ) {
    updateMembershipListing(
      token: $token
      membershipID: $membershipID
      isListed: $isListed
    ) {
      squadMembership {
        id
        status
        isListed
      }
    }
  }
`;

class MainActionButton extends React.Component {
  onDismissClick = async updateMembershipListing => {
    await updateMembershipListing({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        membershipID: this.props.membershipID,
        isListed: false
      }
    });
  };

  render() {
    const userIsInvited = this.props.userStatus === 'invited';
    const userIsSubscribed = this.props.userStatus === 'subscribed';
    const userIsOwner = this.props.userStatus === 'owner';

    if (!this.props.userStatus) {
      return (
        <SquadUpModal
          price={this.props.price}
          service={this.props.service}
          squadID={this.props.squadID}
          description={this.props.description}
          size={this.props.size}
          capacity={this.props.capacity}
          owner={this.props.owner}
        />
      );
    }

    if (userIsInvited) {
      return <AcceptInviteModal squadID={this.props.squadID} />;
    }
    if (userIsOwner) {
      return (
        <Button
          style={{ color: '#f8be00' }}
          onClick={() =>
            this.props.history.push('/squads/' + this.props.squadID + '/edit/')
          }
        >
          Manage
        </Button>
      );
    }
    if (userIsSubscribed) {
      // return <LeaveModal squadID={this.props.squadID} />;
      return (
        <Button
          style={{ color: '#f8be00' }}
          onClick={() =>
            this.props.history.push('/squads/' + this.props.squadID)
          }
        >
          Manage
        </Button>
      );
    }

    return (
      <Mutation mutation={DISMISS_CARD}>
        {updateMembershipListing => (
          <Button
            onClick={() => this.onDismissClick(updateMembershipListing)}
            color="secondary"
          >
            Dismiss
          </Button>
        )}
      </Mutation>
    );
  }
}

export default withRouter(MainActionButton);
