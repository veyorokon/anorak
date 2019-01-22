import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../components/v2/Layout';
import ContentCard from '../../../components/v2/ContentCard';
import TitleCard from '../../../components/v2/TitleCard';
import DashboardIcon from '../../../assets/icons/basic/dashboard';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

class Dashboard extends React.Component {
  componentDidMount() {
    mixpanel.track('Dashboard Page Load');
  }

  cardOneContent = () => {
    return (
      <table class="content-table">
        <tbody class="content-table-body-wrapper">
          <tr class="content-table-header-wrapper">
            <th class="content-table-header">Name</th>
            <th class="content-table-header">Size</th>
            <th class="content-table-header">Capacity</th>
            <th class="content-table-header">Price</th>
            <th class="content-table-header">Created</th>
            <th class="content-table-header">Secret</th>
          </tr>
          <tr class="content-table-body-row">
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
          </tr>
          <tr class="content-table-body-row">
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
          </tr>
        </tbody>
      </table>
    );
  };

  cardTwoContent = () => {
    return (
      <table class="content-table">
        <tbody class="content-table-body-wrapper">
          <tr class="content-table-header-wrapper">
            <th class="content-table-header">Name</th>
            <th class="content-table-header">Size</th>
            <th class="content-table-header">Capacity</th>
            <th class="content-table-header">Price</th>
            <th class="content-table-header">Created</th>
            <th class="content-table-header">Secret</th>
          </tr>
          <tr class="content-table-body-row">
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
          </tr>
          <tr class="content-table-body-row">
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
            <td class="content-table-body-cell">test</td>
          </tr>
        </tbody>
      </table>
    );
  };

  getTitleCard() {
    return (
      <TitleCard
        title="Welcome To Your SquadUp Dashboard!"
        subTitle="Create. Share. Subscribe."
        action="Create a squad"
        notifications="You currently have no new notifications."
        icon={<DashboardIcon />}
      />
    );
  }
  getCardOne() {
    return <ContentCard title="Owned" content={this.cardOneContent()} />;
  }

  getCardTwo() {
    return <ContentCard title="Owned" content={this.cardTwoContent()} />;
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
