import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Navbar from './Navbar';
import SquadList from './SquadList';

const styles = theme => ({
  grid: {
    width: 'auto',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  title: {
    marginTop: 28,
    marginBottom: 6
  }
});

function Layout(props) {
  const { children, classes, rightTitle } = props;

  return (
    <React.Fragment>
      <Navbar onStartClick={props.onStartClick} />
      <Grid container spacing={24} className={classes.grid}>
        <Grid item md={3} className="dashboard-tutorial-second">
          <Typography className={classes.title} align="center" variant="h6">
            My Squads
          </Typography>
          <SquadList />
        </Grid>

        <Grid item md={9}>
          {rightTitle && (
            <Typography className={classes.title} align="left" variant="h6">
              {rightTitle}
            </Typography>
          )}
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  rightTitle: PropTypes.string
};

export default withStyles(styles)(Layout);
