import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DisbandModal from './DisbandModal';
import LeaveModal from './LeaveModal';
import withSnackbar from '../lib/withSnackbar';

const styles = {
  card: {
    width: 240
  },
  cost: {
    marginBottom: 10
  }
};

function SquadOverviewCard(props) {
  const { classes } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.service}
        </Typography>
        <Typography className={classes.cost} color="textSecondary">
          ${(props.price / 100).toFixed(2)} / month
        </Typography>
        <Typography component="p">{props.description}</Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        {props.userStatus === 'owner' && (
          <DisbandModal
            squadID={props.squadID}
            onSuccess={() =>
              props.triggerSnackbar(
                `You successfully disbanded ${props.service}.`
              )
            }
          />
        )}
        {props.userStatus === 'subscribed' && (
          <LeaveModal
            squadID={props.squadID}
            onSuccess={() =>
              props.triggerSnackbar(`You successfully left ${props.service}.`)
            }
          />
        )}
      </CardActions>
    </Card>
  );
}

SquadOverviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  service: PropTypes.string.isRequired,
  squadID: PropTypes.string.isRequired,
  userStatus: PropTypes.string
};

export default withStyles(styles)(withRouter(withSnackbar(SquadOverviewCard)));
