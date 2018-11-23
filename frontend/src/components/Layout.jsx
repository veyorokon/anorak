import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Navbar from './Navbar';
import SquadList from './SquadList';

const styles = theme => ({
  content: {
    display: 'flex'
  },
  left: {
    width: '20%',
    minWidth: 260,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 32,
    marginLeft: 16
  },
  leftTitle: {
    marginTop: 32,
    marginBottom: 6
  },
  right: {
    width: '80%',
    marginRight: 16
  },
  rightTitle: {
    marginTop: 32,
    marginBottom: 6,
    marginLeft: 22
  }
});

function Layout(props) {
  const { children, classes, rightTitle } = props;
  return (
    <div>
      <Navbar />
      <div className={classes.content}>
        <div className={classes.left}>
          <Typography className={classes.leftTitle} align="center" variant="h6">
            Active Squads
          </Typography>
          <SquadList />
        </div>

        <div className={classes.right}>
          <Typography className={classes.rightTitle} align="left" variant="h6">
            {rightTitle}
          </Typography>
          {children}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  rightTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(Layout);
