import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import Search from '../components/Search';
import SearchTable from '../components/SearchTable';

const styles = theme => ({
  search: {
    marginBottom: '14px',
    marginLeft: '14px',
    marginRight: '14px'
  }
});

function Dashboard(props) {
  const { classes } = props;
  return (
    <Layout rightTitle="Find a Squad">
      <div className={classes.search}>
        <Search />
      </div>
      <SearchTable />
    </Layout>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
