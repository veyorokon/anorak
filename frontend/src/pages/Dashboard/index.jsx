import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import SquadSearch from './SquadSearch';

import Joyride from 'react-joyride';

const mixpanel = require('mixpanel-browser');
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
            'Sometimes we share subscriptions with friends and family but collecting payments can be awkward.',
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-first',
          title: "What's A Squad?",
          content:
            'Squads eliminate that awkwardness and let you create shared subscriptions.',
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-first',
          title: 'How Does It Work?',
          content:
            'All squad members pay at the beginning of the month. Squad owners get paid at the end of the month.',
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-first',
          title: 'SquadUp For What?',
          content:
            'SquadUp for phone bills, rent and shared subscriptions. Squad owners can even share encrypted secrets with members.',
          placement: 'bottom',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-first',
          title: 'Why SquadUp?',
          content:
            'Manage all your reocurring payments in one place. Subscribe and cancel at the click of a button.',
          placement: 'bottom',
          disableBeacon: true
        }
      ]
    };
    this.joyride = React.createRef();
  }

  callback = data => {};

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
          styles={{
            options: {
              primaryColor: '#2e2836'
            }
          }}
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
