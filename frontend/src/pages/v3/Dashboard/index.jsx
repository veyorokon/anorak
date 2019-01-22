import React from 'react';
import Navbar from '../../../components/v3/Navbar';
import '../../../Stylesheets/v3/main.css';
import '../../../Stylesheets/v3/dashboard.css';
import '../../../Stylesheets/v2/navbar.css';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Dashboard extends React.Component {
  componentDidMount() {
    mixpanel.track('Dashboard Page Load');
  }

  render() {
    return (
      <div className="Full Dashboard-Background">
        <Navbar />
        <div className="Full Dashboard-Container">
          <div className="Body-Left">Menu</div>
          <div className="Body-Right">Panel</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
