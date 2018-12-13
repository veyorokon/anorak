import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import MainActionButton from './MainActionButton';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 200,
    height: 200
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  image: {
    width: 120
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

function DashboardCard(props) {
  const { classes, squad } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {squad.service}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ${(squad.costPrice / 100).toFixed(2)} / month
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {squad.maximumSize
              ? `${squad.currentSize} / ${squad.maximumSize}`
              : '\u221E'}
          </Typography>
        </CardContent>
        <div className={classes.actions}>
          <MainActionButton
            price={squad.costPrice}
            service={squad.service}
            squadID={squad.id}
            description={squad.description}
            size={squad.currentSize}
            capacity={squad.maximumSize}
            owner={squad.owner}
          />
        </div>
      </div>
      {squad.image && (
        <CardMedia
          className={classes.image}
          image={squad.image}
          title="Squad image"
        />
      )}
    </Card>
  );
}

DashboardCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardCard);
