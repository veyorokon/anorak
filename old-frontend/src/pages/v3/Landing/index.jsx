import React from 'react';
import '../../../Stylesheets/v3/main.css';
import './style.css';

import { ReactComponent as Mountain } from '../../../assets/icons/basic/mountain.svg';
import { ReactComponent as Fire } from '../../../assets/icons/basic/fire.svg';
import { ReactComponent as Subscribe } from '../../../assets/icons/basic/share.svg';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Landing extends React.Component {
  componentDidMount() {
    mixpanel.track('Landing Page Load');
  }

  render() {
    return (
      <div className="Full">
        <div className="Full Bubble-Gradient">
          <div
            className="Padded Landing-Content-Container"
            style={{ '--padding': '7%' }}
          >
            <div className="Landing-Content-Row Landing-Top">
              <div
                className="Logo-Header Align"
                style={{ '--align': 'flex-end', '--size': '95px' }}
              >
                <span className="Theme-Yellow">Squad</span>
                <span className="Theme-White">Up</span>
              </div>
            </div>
            <div className="Landing-Content-Row">
              <div className="Subtitle-Container">
                <span className="Theme-White Subtitle">
                  Shared Subscriptions
                </span>
              </div>
              <div className="Feature-Container">
                <div className="Feature-Odd">
                  <div className="Feature-Icon">
                    <Mountain />
                  </div>
                  <div className="Feature-Title-1 ">Start</div>
                  <div className="Feature-Description">
                    Easily spin up a new subscription account or connect an
                    existing subscription to manage it in one place.
                  </div>
                </div>
                <div className="Feature-Even">
                  <div className="Feature-Icon">
                    <Fire />
                  </div>
                  <div className="Feature-Title-1 ">Share</div>
                  <div className="Feature-Description">
                    Turn your subscription into a squad - or a group
                    subscription where everyone automatically pays each month.
                  </div>
                </div>

                <div className="Feature-Odd">
                  <div className="Feature-Icon">
                    <Subscribe />
                  </div>
                  <div className="Feature-Title-1 ">Subscribe</div>
                  <div className="Feature-Description">
                    Discover new subscription services and subscribe to amazing
                    content from the SquadUp universe.
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
