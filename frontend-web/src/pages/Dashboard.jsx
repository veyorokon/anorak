import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Navbar from '../components/Navbar';
import SquadList from '../components/SquadList';
import SearchTable from '../components/SearchTable';

const styles = theme => ({
  content: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  list: {
    width: '20%',
    minWidth: 260,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 16
  },
  listTitle: {
    marginTop: 32,
    marginBottom: 6
  },
  search: {
    width: '80%',
    marginRight: 16
  },
  searchTitle: {
    marginTop: 32,
    marginBottom: 6,
    marginLeft: 22
  }
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div>
      <Navbar search={<div>test</div>} />
      <div className={classes.content}>
        <div className={classes.list}>
          <Typography className={classes.listTitle} align="center" variant="h6">
            Active Squads
          </Typography>
          <SquadList />
        </div>
        <div className={classes.search}>
          <Typography className={classes.searchTitle} align="left" variant="h6">
            Explore
          </Typography>
          <SearchTable />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
