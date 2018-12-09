import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import AcceptInviteModal from './AcceptInviteModal';
import LeaveModal from './LeaveModal';
import SquadUpModal from './SquadUpModal';

function MainActionButton(props) {
  const userIsInvited = props.userStatus === 'A_6';
  const userIsSubscribed = props.userStatus === 'A_7';
  const userIsOwner = props.userStatus === 'A_8';

  if (!props.userStatus) {
    return (
      <SquadUpModal
        price={props.price}
        service={props.service}
        squadID={props.squadID}
      />
    );
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

  return null;
}

export default withRouter(MainActionButton);