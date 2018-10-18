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
  ImageBackground,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import SquadCard from './Components/SquadCard';
import { Footer, FooterTab, Button, Icon } from 'native-base';
const window = Dimensions.get('window');

export default class SubscriptionDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      dashboardData: {
        0: {
          text: 'SquadUp Phone Plan',
          price: '$ 35',
        },
      },
    };
    this._storeData();
  }

  async _storeData() {
    try {
      const username = this.state.user.email;
      const session_token = this.state.user.session_token.key;
      await AsyncStorage.setItem('SQUAD_UP_KEY', session_token);
      await AsyncStorage.setItem('SQUAD_UP_USERNAME', username);
    } catch (error) {
      // Error saving data
    }
  }

  send_logout_request() {
    fetch('http://127.0.0.1:8000/api/users/logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.user),
    })
      .then(response => {
        this.props.navigation.navigate('Home');
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
            onPress={() => this.send_logout_request()}
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
            <Button onPress={() => alert('Account')}>
              <Text>Account</Text>
              <Icon name="ios-contact-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }

  _renderRow = ({ data, active }) => {
    return <Row data={data} active={active} />;
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
  }

  render() {
    const { data } = this.props;

    return (
      <Animated.View style={[this._style]}>
        <SquadCard
          navigation={this.props.navigation}
          title={data.text}
          price={data.price}
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
