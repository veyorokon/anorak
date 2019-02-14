import React from 'react';
import Paper from '@material-ui/core/Paper';
import './style.css';
import SubscriptionCard from './components/Card';
import { ReactComponent as Squad } from '../../../assets/icons/basic/squad.svg';
import Grid from '@material-ui/core/Grid';

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
      <Grid
        className={this.props.className}
        style={{
          maxWidth: 'fit-content',
          flexDirection: 'column',
          height: 'fit-content'
        }}
        direction="column"
        container
        spacing={24}
      >
        <Grid
          style={{
            flexGrow: 0,
            maxWidth: 'fit-content',
            maxHeight: 'fit-content',
            flexBasis: 'auto'
          }}
          item
          xs={'auto'}
        >
          <div className="Subscription-Box-Wrapper">
            <div className="Subscription-Box Add-Style">
              <Tooltip title="  Add a subscription" aria-label="Add">
                <Fab className="Add-Button-Style">
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          </div>
        </Grid>
        <Grid
          style={{
            flexGrow: 0,
            maxWidth: 'fit-content',
            maxHeight: 'fit-content',
            flexBasis: 'auto'
          }}
          item
          xs={'auto'}
        >
          <div className="Subscription-Box-Wrapper">
            <div className="Subscription-Box">
              <SubscriptionCard />
            </div>
          </div>
        </Grid>
        <Grid
          style={{
            flexGrow: 0,
            maxWidth: 'fit-content',
            maxHeight: 'fit-content',
            flexBasis: 'auto'
          }}
          item
          xs={'auto'}
        >
          <div className="Subscription-Box-Wrapper">
            <div className="Subscription-Box">
              <SubscriptionCard />
            </div>
          </div>
        </Grid>
        <Grid
          style={{
            flexGrow: 0,
            maxWidth: 'fit-content',
            maxHeight: 'fit-content',
            flexBasis: 'auto'
          }}
          item
          xs={'auto'}
        >
          <div className="Subscription-Box-Wrapper">
            <div className="Subscription-Box">
              <SubscriptionCard />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default SubscriptionPanel;
