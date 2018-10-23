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
import {
  SquadCardCondensed,
  CreateSquadModal,
  JoinSquadModal,
} from './Components';
import { Footer, FooterTab, Button } from 'native-base';
import api from '../../lib/api';
import styles from './styles';

export default class SubscriptionDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      modals: {
        create: false,
        join: false,
      },
      dashboardData: this.props.navigation.state.params.dashboardData,
      forms: {
        create: {
          service: '',
          maximum_size: 0,
          cost_price: 0,
          username: '',
          password: '',
        },
        join: {},
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

  toggle_modal(field) {
    let newModals = Object.assign(this.state.modals);
    newModals[field] = !this.state.modals[field];
    this.setState({
      modals: newModals,
    });
  }

  send_logout_request() {
    api
      .sendLogoutRequest(this.state.user)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        alert(err.message);
      });
  }

  send_create_squad_request() {
    api
      .sendCreateSquadRequest(this.state.user, this.state.forms.create)
      .then(() => {})
      .catch(err => {
        alert(err.message);
      });
  }

  handle_form_input(form, field, value) {
    let newFormsData = Object.assign(this.state.forms);
    newFormsData[form][field] = value;
    this.setState({
      forms: newFormsData,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/** The header, logo and buttons for create, join and logout **/}
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

        {/** Create and Join a squad options.**/}

        <View style={{ flexDirection: 'row', paddingBottom: 5, paddingTop: 8 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.toggle_modal('create');
              }}
            >
              <Text style={{ color: '#0E6E6E' }}>Create Squad</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.toggle_modal('join');
              }}
            >
              <Text style={{ color: '#0E6E6E' }}>Join Squad</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/** The dashboard of the user's squads.**/}

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

        {/** Modals to collect input for create and join squad forms .**/}

        <CreateSquadModal
          visible={this.state.modals.create}
          toggleModal={() => this.toggle_modal('create')}
          handleFormInput={(field, value) =>
            this.handle_form_input('create', field, value)}
          onSubmit={() => this.send_create_squad_request()}
        />

        <JoinSquadModal
          visible={this.state.modals.join}
          toggleModal={() => this.toggle_modal('join')}
          handleFormInput={(field, value) =>
            this.handle_form_input('join', field, value)}
        />
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
        <SquadCardCondensed
          data={data}
          loginButtonImage={require('../../../assets/login-circle-bold.png')}
          optionButtonImage={require('../../../assets/menu-dots-filled.png')}
        />
      </Animated.View>
    );
  }
}
