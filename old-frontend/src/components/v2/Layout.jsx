import React from 'react';
import '../../Stylesheets/v2/main.css';
import NavBar from '../../components/v2/Navbar';
import SideMenu from '../../components/v2/SideMenu';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Layout extends React.Component {
  componentDidMount() {
    mixpanel.track('Layout Page Load');
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
              {this.props.TitleCard}
              {this.props.Content.map(item => {
                return (
                  <React.Fragment key={item.Title}> {item}</React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
