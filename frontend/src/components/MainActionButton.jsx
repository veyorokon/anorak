import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import AcceptInviteModal from './AcceptInviteModal';
import LeaveModal from './LeaveModal';
import SquadUpModal from './SquadUpModal';

function MainActionButton(props) {
  const membershipIsPending = props.userStatus === 'A_5';
  const membershipIsRejected = props.userStatus === 'A_2';
  const userIsInvited = props.userStatus === 'A_6';
  const userIsSubscribed = props.userStatus === 'A_7';
  const userIsOwner = props.userStatus === 'A_8';

  if (membershipIsPending || membershipIsRejected) {
    return null;
  }

  if (userIsInvited) {
    return <AcceptInviteModal squadID={props.squadID} />;
  }
  if (userIsOwner) {
    return (
      <Button
        style={{ color: '#f8be00' }}
        onClick={() => props.history.push('/squads/' + props.squadID)}
      >
        Manage
      </Button>
    );
  }
  if (userIsSubscribed) {
    return <LeaveModal squadID={props.squadID} />;
  }

  return (
    <SquadUpModal
      price={props.price}
      service={props.service}
      squadID={props.squadID}
    />
  );
}

export default withRouter(MainActionButton);
