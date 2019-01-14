import React from 'react';
import PropTypes from 'prop-types';
import '../../Stylesheets/main.css';

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
        <div class="header-container">
          <div class="header-left" />
          <div class="header-right">
            test
            <div class="nav-wrapper">nav wrap</div>
          </div>
        </div>
        <div class="body-container">
          <div class="body-left">
            <div class="menu">
              <div class="menu-row-wrapper">
                <div class="menu-icon">ICN</div>
                <div class="menu-option">option 1</div>
              </div>
              <div class="menu-row-wrapper">
                <div class="menu-icon">ICN</div>
                <div class="menu-option">option 2</div>
              </div>
              <div class="menu-row-wrapper">
                <div class="menu-icon">ICN</div>
                <div class="menu-option">option 3</div>
              </div>
              <div class="menu-row-wrapper">
                <div class="menu-icon">ICN</div>
                <div class="menu-option">option 4</div>
              </div>
            </div>
          </div>
          <div class="body-right">test</div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Layout;
