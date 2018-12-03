import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const statusToText = {
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
