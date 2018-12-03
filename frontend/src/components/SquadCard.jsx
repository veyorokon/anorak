import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import LeaveModal from './LeaveModal';
import SquadCardModal from './SquadCardModal';

const styles = {
  card: {
    width: 240
  },
  cost: {
    marginBottom: 10
  }
};

function SquadCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
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
        <SquadCardModal
          title={props.service}
          membershipID={props.membershipID}
        />
        {props.status === 'A_8' && (
          <Button
            style={{ color: '#f8be00' }}
            onClick={() => props.history.push('/squads/' + props.squadID)}
          >
            Manage
          </Button>
        )}
        {props.status === 'A_7' && <LeaveModal squadID={props.squadID} />}
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
