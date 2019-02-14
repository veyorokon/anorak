import React from 'react';
import { Navbar } from '../../../components/v3';
import { SubscriptionPanel } from '../../../components/v3';
import { SideMenu } from '../../../components/v3/';

import '../../../Stylesheets/v3/main.css';
import './style.css';

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
        <div className="Full">
          <div className="Dashboard-Content-Container">
            <div className="Dashboard-Left-Wrapper">
              <div
                className="Padded Dashboard-Menu-Container"
                style={{ '--padding': '30% 0% 0% 25%' }}
              >
                <SideMenu />
              </div>
            </div>
            <div className="Dashboard-Right-Wrapper">
              <div
                className="Padded Dashboard-Body-Container"
                style={{ '--padding': '2% 15% 0% 2%' }}
              >
                <SubscriptionPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
