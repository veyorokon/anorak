import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 300
  },
  pos: {
    marginBottom: 10
  }
};

function SquadCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ${props.price}
          .00 / month
        </Typography>
        <Typography component="p">{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" size="small">
          Manage
        </Button>
      </CardActions>
    </Card>
  );
}

SquadCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SquadCard);
