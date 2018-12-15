import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LeaveModal from './LeaveModal';

import { withRouter } from 'react-router-dom';

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
        <LeaveModal squadID={props.squadID} />;
      </CardActions>
    </Card>
  );
}

SquadOverviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  service: PropTypes.string.isRequired
  // squadID: PropTypes.string.isRequired
};

export default withStyles(styles)(withRouter(SquadOverviewCard));
