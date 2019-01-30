import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import '../../../Stylesheets/v3/main.css';
import Navbar from '../../../components/v3/Navbar';
import {
  FullContainer,
  CtaMain,
  CtaLeft,
  CtaRight,
  H1,
  SubHeader
} from './styles.jsx';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class LandingPage extends Component {
  componentDidMount() {
    mixpanel.track('Landing Page Load');
  }

  render() {
    return (
      <FullContainer>
        <Navbar />
        <CtaMain>
          <CtaLeft>
            <H1>
              Share Subscriptions <br /> With Your Squad.
            </H1>
            <Button
              variant="contained"
              style={{ height: '50px', width: '170px' }}
            >
              Discover More
            </Button>
            <SubHeader>COMPATIBLE WITH</SubHeader>
          </CtaLeft>
          <CtaRight>
            <H1>That</H1>
          </CtaRight>
        </CtaMain>
      </FullContainer>
    );
  }
}

export default LandingPage;
