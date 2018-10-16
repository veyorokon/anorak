/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  AsyncStorage,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import SubscriptionCard from './Components/SubscriptionCard';
import { Footer, FooterTab, Button, Icon } from 'native-base';
const window = Dimensions.get('window');

export default class SubscriptionDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      tokenCredentials: {
        username: this.props.navigation.state.params.data.user.profile.username,
        token: this.props.navigation.state.params.data.token,
      },
      dashboardData: {
        0: {
          text: 'SquadUp Phone Plan',
          price: '$ 35',
          body:
            'Unlimited phone data provided though Cricket. No contract, cancel anytime. Billed monthly.',
          status: this.getSquadUpOption(
            this.props.navigation.state.params.data.subscriber
          ),
          footer: 'Terms',
          termsLink: 'https://www.cricketwireless.com/terms',
        },
      },
    };

    this._storeData();
  }

  /**
   * Checks which value to display to the user who wants to subscribe.
   * Need to force app refresh.
   * @param  {[type]} subscriber [subscriber status]
   * @return {[type]}            [JSON]
   */
  getSquadUpOption(subscriber) {
    if (subscriber == null || (subscriber.isProcessed && !subscriber.isValid)) {
      var status = 0;
    } else if (!subscriber.isProcessed) {
      status = 1;
    } else {
      status = 2;
    }
    return status;
  }

  /**
   * Handles automatically updating user data after billing information
   * added to allow subscription
   * @return {[type]} [description]
   */
  componentWillMount() {
    this.updateBillingData();
  }

  updateBillingData() {
    const before = this.state.data.user.address.billing.valid;
    if (!this.state.data.user.address.billing.valid) {
      //alert(JSON.stringify(this.state.tokenCredentials));
      fetch('http://18.191.250.199:8000/api-token-login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.tokenCredentials),
      })
        .then(response => {
          if (response.status == 200) {
            response.json();
            const after = JSON.parse(response._bodyText).user.address.billing
              .valid;
            if (before != after) {
              this.setState({
                data: JSON.parse(response._bodyText),
              });
            }
          } else {
            throw new Error(response.status);
          }
        })
        .catch(() => {
          //alert(JSON.stringify(err.message));
        });
    }
  }

  async _storeData() {
    try {
      const username = this.state.data.user.profile.username;
      const token = this.state.data.token;
      await AsyncStorage.setItem('SQUAD_UP_KEY', token);
      await AsyncStorage.setItem('SQUAD_UP_USERNAME', username);
    } catch (error) {
      // Error saving data
    }
  }

  handleLogout() {
    fetch('http://18.191.250.199:8000/logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    })
      .then(response => {
        response.json();
        if (response.status == 200) {
          this.props.navigation.navigate('Home');
        } else {
          throw new Error(response.status);
        }
      })
      .catch(err => {
        alert(JSON.stringify(err.message));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Subscription Dashboard</Text>
          <Button
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleLogout()}
          >
            <Text style={{ color: '#307FF6' }}>Logout</Text>
          </Button>
        </View>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.state.dashboardData}
          renderRow={this._renderRow}
        />

        <Footer>
          <FooterTab>
            <Button active>
              <Text>Dashboard</Text>
              <Icon name="ios-apps-outline" />
            </Button>
            <Button
              onPress={() =>
                this.props.navigation.navigate('Account', {
                  user: this.state.data.user,
                  token: this.state.data.token,
                })}
            >
              <Text>Account</Text>
              <Icon name="ios-contact-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }

  _renderRow = ({ data, active }) => {
    return (
      <Row
        data={data}
        active={active}
        isBillingValid={this.state.data.user.address.billing.valid}
        navigation={this.props.navigation}
        user={this.state.data.user}
        token={this.state.tokenCredentials.token}
      />
    );
  };
}

class Row extends Component {
  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            },
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
    this.setState({ isBillingValid: nextProps.isBillingValid });
    //alert('IS BILLING VALID: ' + nextProps.isBillingValid);
  }

  render() {
    const { data } = this.props;

    return (
      <Animated.View style={[this._style]}>
        <SubscriptionCard
          navigation={this.props.navigation}
          title={data.text}
          price={data.price}
          status={data.status}
          titleStyle={styles.text}
          body={data.body}
          footer={data.footer}
          termsLink={data.termsLink}
          isBillingValid={this.props.isBillingValid}
          user={this.props.user}
          token={this.props.token}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
      },

      android: {
        paddingHorizontal: 0,
      },
    }),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },

  image: {
    height: 200,
    width: null,
    flex: 1,
  },

  text: {
    fontSize: 20,
    paddingVertical: 20,
  },
});
