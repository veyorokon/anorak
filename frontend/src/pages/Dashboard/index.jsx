import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import SquadSearch from './SquadSearch';

import Joyride from 'react-joyride';

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
            'Squad owners can send you invites or you can search for Squads created by other users here.',
          placement: 'left',
          disableBeacon: true
        },
        {
          target: '.dashboard-tutorial-fourth',
          title: 'Is It Free To Create A Squad?',
          content:
            "Yes! Squads are free to create. Just make sure you've selected how you'd like to be paid: (Paypal or Venmo)  in your Account page. Then in the Navbar, click the 'CREATE' button to get started.",
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

  handleOnStartClick() {
    this.setState({ run: true });
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
          styles={{
            options: {
              arrowColor: '#fff',
              backgroundColor: '#fff',
              overlayColor: 'rgba(0, 0, 0, 0.4)',
              primaryColor: '#000',
              textColor: '#000',
              maxWidth: 300
            }
          }}
          floaterProps={{ disableAnimation: true }}
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
