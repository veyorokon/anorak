import React from 'react';
import Paper from '@material-ui/core/Paper';
import './style.css';
import SubscriptionCard from './components/Card';
import { ReactComponent as Squad } from '../../../assets/icons/basic/squad.svg';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class SubscriptionPanel extends React.Component {
  componentDidMount() {
    mixpanel.track('Dashboard Page Load');
  }

  render() {
    return (
      <div className="Subscription-Panel">
        <div
          className="Padded Subscription-Panel-Content"
          style={{ '--padding': '4% 10% 0% 10%' }}
        >
          <div className="Subscription-Panel-Body">
            <div className="Subscription-Panel-Header">
              <Paper className="Subscription-Panel-Bar-Container">
                <div className="Subscription-Panel-Bar">
                  <div className="Panel-Bar-Left">
                    <div className="Title">Subscription Dashboard</div>
                    <div className="Subtext">
                      You currently have no notifications
                    </div>
                  </div>
                  <div className="Panel-Bar-Right">
                    <div className="Bar-Icon">
                      <Squad />
                    </div>
                    <div className="Slogan">Create. Share. Subscribe.</div>
                  </div>
                </div>
              </Paper>
            </div>
            <div className="Subscription-Container">
              <div className="Subscription-Box-Wrapper">
                <div className="Subscription-Box Add-Style">
                  <Tooltip title="  Add a subscription" aria-label="Add">
                    <Fab className="Add-Button-Style">
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </div>
              </div>
              <div className="Subscription-Box-Wrapper">
                <div className="Subscription-Box">
                  <SubscriptionCard />
                </div>
              </div>
              <div className="Subscription-Box-Wrapper">
                <div className="Subscription-Box">
                  <SubscriptionCard />
                </div>
              </div>
              <div className="Subscription-Box-Wrapper">
                <div className="Subscription-Box">
                  <SubscriptionCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscriptionPanel;
