import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import NetflixLogo from '../../../assets/icons/logos/netflix_gray.png';
import HuluLogo from '../../../assets/icons/logos/hulu_gray.png';
import SpotifyLogo from '../../../assets/icons/logos/spotify_gray.png';
import AppleMusicLogo from '../../../assets/icons/logos/apple_music_gray.png';
import '../../../Stylesheets/v3/main.css';
import Navbar from '../../../components/v3/Navbar';
import {
  FullContainer,
  CtaMain,
  CtaLeft,
  CtaRight,
  H1,
  SubHeader,
  Image,
  FlexRow,
  MidFoldContainer,
  FlexRowDiv,
  PText,
  Diamond,
  FlexRowSpaced
} from './styles.jsx';
import IconCard from '../../../components/v3/IconCard';

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
            <FlexRowDiv>
              <Button
                variant="contained"
                style={{ height: '50px', width: '170px' }}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                style={{ height: '50px', width: '170px', marginLeft: '25px' }}
              >
                Discover More
              </Button>
            </FlexRowDiv>
            <SubHeader>COMPATIBLE WITH</SubHeader>
            <FlexRow>
              <Image
                src={NetflixLogo}
                alt="Netflix Logo"
                style={{ marginLeft: '-35px' }}
              />
              <Image src={HuluLogo} alt="Hulu Logo" />
              <Image src={SpotifyLogo} alt="Spotify Logo" />
              <Image src={AppleMusicLogo} alt="Apple Music Logo" />
            </FlexRow>
          </CtaLeft>
          <CtaRight>
            <H1>{/* Placeholder for content */}</H1>
            <Diamond />
          </CtaRight>
        </CtaMain>
        <MidFoldContainer>
          <SubHeader style={{ fontSize: '0.8rem' }}>FEATURES</SubHeader>
          <H1 style={{ marginBottom: '10px' }}>
            Subscribe &#8226; Share &#8226; Save
          </H1>
          <PText>
            SquadUp allows users to subscribe to many popular subscription
            services, then share that subscription with friends and family. The
            more in your Squad, the lower the cost each Squad member pays for
            the subscription.
          </PText>
          <FlexRowSpaced>
            <IconCard icon="arrow" title="Hello World" />
            <IconCard icon="note" title="Hello World" />
            <IconCard icon="globe" title="Hello World" />
          </FlexRowSpaced>
        </MidFoldContainer>
      </FullContainer>
    );
  }
}

export default LandingPage;
