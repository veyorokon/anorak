import React from 'react';
import '../../../Stylesheets/v3/main.css';
import { ReactComponent as Mountain } from '../../../assets/icons/basic/mountain.svg';
import { ReactComponent as Fire } from '../../../assets/icons/basic/fire.svg';
import { ReactComponent as Share } from '../../../assets/icons/basic/share.svg';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Landing extends React.Component {
  componentDidMount() {
    mixpanel.track('Landing Page Load');
  }

  render() {
    return (
      <div className="Full">
        <div className="Bubble-Gradient">
          <div className="Full Padded" style={{ '--padding': '7%' }}>
            <div className="Flex" style={{ '--row': '1', '--col': '1' }}>
              <div
                className="Logo-Header Align Flex"
                style={{ '--align': 'flex-end', '--size': '95px' }}
              >
                <span className="Theme-Yellow">Squad</span>
                <span className="Theme-White">Up</span>
              </div>
            </div>

            <div
              className="Flex"
              style={{ '--row': '1', '--col': '1', '--dir': 'column' }}
            >
              <div
                className="Flex"
                style={{ '--row': '1', '--col': '1', '--dir': 'row' }}
              >
                <span className="Theme-White Subtitle">
                  Shared Subscriptions
                </span>
              </div>

              <div
                className="Flex Padded"
                style={{
                  '--row': '1',
                  '--col': '1',
                  '--dir': 'row',
                  '--padding': '0 0 0 5%'
                }}
              >
                <div
                  className="Flex Padded Justify"
                  style={{
                    '--row': '1',
                    '--col': '1',
                    '--dir': 'column',
                    '--padding': '0 5% 0 5%',
                    '--justify': 'flex-end'
                  }}
                >
                  <div className="Feature-Icon">
                    <Mountain />
                  </div>
                  <div
                    className="Feature-Title-1 Justify"
                    style={{ '--justify': 'center' }}
                  >
                    Create
                  </div>
                  <div className="Feature-Description">
                    Create a group subscription with a squad and members will
                    automatically pay you every month.
                  </div>
                </div>
                <div
                  className="Flex Padded Justify"
                  style={{
                    '--row': '1',
                    '--col': '1',
                    '--dir': 'column',
                    '--padding': '0 5% 0 5%',
                    '--justify': 'flex-start'
                  }}
                >
                  <div className="Feature-Icon">
                    <Fire />
                  </div>
                  <div
                    className="Feature-Title-2 Justify"
                    style={{ '--justify': 'center' }}
                  >
                    Share
                  </div>
                  <div className="Feature-Description">
                    Invite friends and family to your squads and securely share
                    any account or login information needed for the shared
                    service.
                  </div>
                </div>
                <div
                  className="Flex Padded Justify"
                  style={{
                    '--row': '1',
                    '--col': '1',
                    '--dir': 'column',
                    '--padding': '0 5% 0 5%',
                    '--justify': 'flex-end'
                  }}
                >
                  <div className="Feature-Icon">
                    <Share />
                  </div>
                  <div
                    className="Feature-Title-3 Justify"
                    style={{ '--justify': 'center' }}
                  >
                    Subscribe
                  </div>
                  <div className="Feature-Description">
                    Manage all your subscriptions, phone bills or rent in one
                    simple interface. Cancel and subscribe at the click of a
                    button.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
