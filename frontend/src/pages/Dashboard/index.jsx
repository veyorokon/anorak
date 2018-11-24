import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import SquadSearch from './SquadSearch';

const styles = theme => ({});

function Dashboard(props) {
  // const { classes } = props;
  return (
    <Layout rightTitle="Find a Squad">
      <SquadSearch />
    </Layout>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
