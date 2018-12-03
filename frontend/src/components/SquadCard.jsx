import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import AcceptInviteModal from './AcceptInviteModal';
import DeclineInviteModal from './DeclineInviteModal';
import LeaveModal from './LeaveModal';
import SquadCardModal from './SquadCardModal';
import SquadStatus from './SquadStatus';

const styles = {
  card: {
    width: 240
  },
  cost: {
    marginBottom: 10
  },
  firstRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

function SquadCard(props) {
  const { classes } = props;

  const userIsInvited = props.status === 'A_6';
  const userIsSubscribed = props.status === 'A_7';
  const userIsOwner = props.status === 'A_8';
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.firstRow}>
          <Typography variant="h6" component="h2">
            {props.service}
          </Typography>
          <SquadStatus status={props.status} />
        </div>
        <Typography className={classes.cost} color="textSecondary">
          ${(props.price / 100).toFixed(2)} / month
        </Typography>
        <Typography component="p">{props.description}</Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        {/* Button 1 */}
        {userIsInvited && <AcceptInviteModal squadID={props.squadID} />}
        {(userIsSubscribed || userIsOwner) && (
          <SquadCardModal
            title={props.service}
            membershipID={props.membershipID}
          />
        )}

        {/* Button 2 */}
        {userIsInvited && <DeclineInviteModal squadID={props.squadID} />}
        {userIsOwner && (
          <Button
            style={{ color: '#f8be00' }}
            onClick={() => props.history.push('/squads/' + props.squadID)}
          >
            Manage
          </Button>
        )}
        {userIsSubscribed && <LeaveModal squadID={props.squadID} />}
      </CardActions>
    </Card>
  );
}

SquadCard.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  service: PropTypes.string.isRequired,
  squadID: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default withStyles(styles)(withRouter(SquadCard));
