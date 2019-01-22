import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../components/v2/Layout';
import AccountCard from '../../../components/v2/AccountCard';
import TitleCard from '../../../components/v2/TitleCard';
import RobotIcon from '../../../assets/icons/basic/robot';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Dashboard extends React.Component {
  componentDidMount() {
    mixpanel.track('Account Page Load');
  }

  cardOneContent = () => {
    return (
      <React.Fragment>
        <div class="account-column">
          <div class="account-field-row">
            <div class="account-field-label">Email:</div>
            <div class="account-field-value">veyorokon@gmail.com</div>
          </div>
          <div class="account-field-row">
            <div class="account-field-label">Phone:</div>
            <div class="account-field-value">5133489639</div>
          </div>
          <div class="account-field-address-box">
            <div class="account-field-label">Billing Address:</div>
            <div class="account-field-address-wrapper">
              <div>1234 Yoyo Street</div>
              <div>Apt. 100</div>
              <div>Clear View, CA 12345</div>
            </div>
          </div>
        </div>

        <div class="account-column">
          <div class="account-field-address-box">
            <div class="account-field-label">Shipping Address:</div>
            <div class="account-field-address-wrapper">
              <div>1234 Yoyo Street</div>
              <div>Apt. 100</div>
              <div>Clear View, CA 12345</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  cardTwoContent = () => {
    return <div>t</div>;
  };

  getTitleCard() {
    return (
      <TitleCard
        title="Account Overview."
        subTitle="Your profile settings."
        notifications="You currently have no new notifications."
        icon={<RobotIcon />}
      />
    );
  }
  getCardOne() {
    return (
      <AccountCard title="Vahid Eyorokon" content={this.cardOneContent()} />
    );
  }

  getCardTwo() {
    return (
      <AccountCard
        title="Billing Information"
        content={this.cardTwoContent()}
      />
    );
  }

  render() {
    const titleCard = this.getTitleCard();
    const contentCards = [this.getCardOne(), this.getCardTwo()];

    return <Layout TitleCard={titleCard} Content={contentCards} />;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
