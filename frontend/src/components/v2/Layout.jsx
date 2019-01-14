import React from 'react';
import PropTypes from 'prop-types';
import '../../Stylesheets/main.css';
import NavBar from '../../components/v2/Navbar';
import SideMenu from '../../components/v2/SideMenu';
import TitleCard from '../../components/v2/TitleCard';
import ContentCard from '../../components/v2/ContentCard';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Layout extends React.Component {
  componentDidMount() {
    mixpanel.track('Layout Page Load');
  }

  handleOnStartClick() {
    this.setState({ run: true });
    mixpanel.track('Layout Tutorial Click');
  }

  render() {
    return (
      <div class="box">
        <NavBar />
        <div class="body-container">
          <div class="body-left">
            <SideMenu />
          </div>
          <div class="body-right">
            <div class="body-content-wrapper">
              <TitleCard />
              <ContentCard />
              <ContentCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Layout;
