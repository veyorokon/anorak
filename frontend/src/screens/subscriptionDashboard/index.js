/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Text,
  View,
  Platform,
  AsyncStorage,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import { SquadCardCondensed, CreateSquadModal } from './Components';
import { Footer, FooterTab, Button } from 'native-base';
import styles from './styles';

export default class SubscriptionDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      isModalVisible: false,
      dashboardData: {
        0: {
          title: 'Netflix',
          price: '$ 3.00',
          owner: 'Natasha',
          status: 'Joined',
        },
        1: {
          title: 'Hulu',
          price: '$ 1.50',
          owner: 'Ben',
          status: 'Owner',
          order: 1,
        },
        2: {
          title: 'Spotify',
          price: '$ 1.00',
          owner: 'Vahid',
          status: 'Pending',
          order: 2,
        },
        3: {
          title: 'HBO',
          price: '$ 1.25',
          owner: 'Natasha',
          status: 'Pending',
          order: 3,
        },
        4: {
          title: 'Prime',
          price: '$ 4.25',
          owner: 'Tom',
          status: 'Joined',
          order: 4,
        },
      },
    };
    this._storeData();
  }

  async _storeData() {
    try {
      const phone_number = this.state.user.phone_number;
      const session_token = this.state.user.session_token.key;
      await AsyncStorage.setItem('SQUAD_UP_SESSION_KEY', session_token);
      await AsyncStorage.setItem('SQUAD_UP_USERNAME', phone_number);
    } catch (error) {}
  }

  componentDidMount() {
    StatusBar.setHidden(true);
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

  send_create_squad_request() {
    fetch('http://127.0.0.1:8000/api/dashboard/create_squad/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.state.user }),
    })
      .then(response => {})
      .catch(err => {
        alert(JSON.stringify(err.message));
      });
  }

  _toggle_modal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginLeft: 44,
            }}
          >
            <Text style={styles.title}>Squad Up</Text>
          </View>

          <View style={{ paddingRight: 10 }}>
            <TouchableOpacity onPress={() => this.send_logout_request()}>
              <Image
                source={require('../../../assets/logout.png')}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: '#0E6E6E',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 5, paddingTop: 8 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => this._toggle_modal()}>
              <Text style={{ color: '#0E6E6E' }}>Create Squad</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => alert('Join pressed')}>
              <Text style={{ color: '#0E6E6E' }}>Join Squad</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.state.dashboardData}
          renderRow={this._renderRow}
        />

        <Footer style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <FooterTab>
            <Button active>
              <Text>Dashboard</Text>
            </Button>
            <Button onPress={() => alert('Billing')}>
              <Text>Billing</Text>
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
        <SquadCardCondensed data={data} />
      </Animated.View>
    );
  }
}
