import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../components/v2/Layout';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Dashboard extends React.Component {
  componentDidMount() {
    mixpanel.track('Dashboard Page Load');
  }

  handleOnStartClick() {
    this.setState({ run: true });
    mixpanel.track('Dashboard Tutorial Click');
  }

  render() {
    return <Layout />;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
