import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../components/v2/Layout';
import ContentCard from '../../../components/v2/ContentCard';
import TitleCard from '../../../components/v2/TitleCard';
import ChemistryIcon from '../../../assets/icons/basic/chemistry';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Dashboard extends React.Component {
  componentDidMount() {
    mixpanel.track('Dashboard Page Load');
  }

  getDiscoverContent() {
    return (
      <div class="discovery-box-wrapper">
        <div class="discovery-column-wrapper">
          <div class="discovery-icon-wrapper">
            <ChemistryIcon />
          </div>
          <div class="discovery-text-wrapper">
            <div class="discovery-text-h1">Coming Soon ...</div>
            <div class="discovery-text-subtitle">
              Discover a world of subscription services. Or create your own and
              share it with the world!
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <Layout Content={[this.getDiscoverContent()]} />;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
