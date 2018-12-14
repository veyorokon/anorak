import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import SquadSearch from './SquadSearch';

import Joyride from 'react-joyride';

var mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

const styles = theme => ({});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      run: false,
      steps: [
        {
          target: '.dashboard-tutorial-first',
          title: 'Welcome to SquadUp!',
          content:
            'The place to create, discover and subscribe to all your favorite subscription services.',
          placement: 'top',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-first',
          title: "What's A Squad?",
          content:
            'A Squad is a group of users who pay for access to some content.',
          placement: 'top',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-second',
          title: 'How Do I Access My Squads?',
          content:
            'All Squads you join or are invited to will appear here as an overview card.',
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-third',
          title: 'How Do I Find Squads?',
          content:
            'Squad owners can send you invites or you can search for services .',
          placement: 'left',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-fourth',
          title: 'Is It Free To Create A Squad?',
          content:
            "Yes! Squads are free to create. Click the 'CREATE' button to get started.",
          placement: 'left',
          disableBeacon: true
        }
      ]
    };
    this.joyride = React.createRef();
  }

  callback = data => {
    const { action, index, type } = data;
  };

  componentDidMount() {
    mixpanel.track('Dashboard Page Load');
  }

  handleOnStartClick() {
    this.setState({ run: true });
    mixpanel.track('Dashboard Tutorial Click');
  }

  render() {
    const { steps, run } = this.state;
    return (
      <Layout onStartClick={this.handleOnStartClick.bind(this)}>
        <Joyride
          ref="joyride"
          steps={steps}
          run={run}
          callback={this.callback}
          continuous={true}
          showSkipButton={true}
          floaterProps={{ disableAnimation: true }}
          reset={true}
        />
        <SquadSearch />
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
