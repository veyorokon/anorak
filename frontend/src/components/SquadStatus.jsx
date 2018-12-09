import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const statusToText = {
  A_0: 'Banned',
  A_1: 'Kicked',
  A_2: 'Rejected',
  A_3: 'Unsubscribed',
  A_4: 'Terminated',
  A_5: 'Pending',
  A_6: 'Invited',
  A_7: 'Subscribed',
  A_8: 'Owner'
};

function SquadStatus({ status }) {
  return <Typography color="textSecondary">{statusToText[status]}</Typography>;
}
SquadStatus.propTypes = {
  status: PropTypes.string.isRequired
};

export default SquadStatus;
