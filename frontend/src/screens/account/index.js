import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  Tab,
  FooterTab,
  Tabs,
} from 'native-base';
import ProfileTab from './tabs/ProfileTab';
import BillingTab from './tabs/BillingTab';

import styles from './styles';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user.profile,
      address_home: this.props.navigation.state.params.user.address.home,
      address_billing: this.props.navigation.state.params.user.address.billing,
      token: this.props.navigation.state.params.token,
      activeTab: 0,
    };
  }

  componentWillMount() {
    if (this.props.navigation.state.params.activeTab) {
      this.toggleTab2();
    } else {
      this.toggleTab1();
    }
    // if (this.props.token) {
    //   this.setState({ token: this.props.token });
    // }
  }

  toggleTab1() {
    this.setState({
      activeTab: 0,
    });
  }
  toggleTab2() {
    this.setState({
      activeTab: 1,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={{ marginTop: 30 }}>
          <Tabs initialPage={this.state.activeTab}>
            <Tab heading="Profile">
              <ProfileTab
                user={this.state.user}
                address_home={this.state.address_home}
                token={this.state.token}
                tabLabel="One"
              />
            </Tab>
            <Tab heading="Billing">
              <BillingTab
                user={this.state.user}
                address_billing={this.state.address_billing}
                token={this.state.token}
                tabLabel="Two"
              />
            </Tab>
          </Tabs>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() =>
                this.props.navigation.navigate('SubscriptionDashboard')}
            >
              <Text>Dashboard</Text>
              <Icon name="ios-apps-outline" />
            </Button>
            <Button active>
              <Text>Account</Text>
              <Icon name="ios-contact-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Account;
