import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Navbar from '../components/Navbar';
import SquadList from '../components/SquadList';

const styles = theme => ({
  content: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  list: {
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  listTitle: {
    marginTop: 20,
    marginBottom: 20
  },
  search: {
    width: '67%'
  }
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div>
      <Navbar />
      <div className={classes.content}>
        <div className={classes.list}>
          <Typography className={classes.listTitle} align="center" variant="h5">
            Active Squads
          </Typography>
          <SquadList />
        </div>
        <div className={classes.search}>Search</div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
