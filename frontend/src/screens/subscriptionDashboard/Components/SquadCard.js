import React, { Component } from 'react';
import { Linking, TouchableOpacity, Alert } from 'react-native';
import { Card, CardItem, Text, Body, Left, Right, View } from 'native-base';
import SignupModal from './SignupModal';
import CancelModal from './CancelModal';

import './styles';

export default class SquadCard extends Component {
  state = {
    data: this.props.data,
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _toggleSignupModal = () => {
    if (this.props.status == 0) {
      if (this.state.isBillingValid) {
        this.setState({
          isSignupModalVisible: !this.state.isSignupModalVisible,
        });
      } else {
        this._showBillingInformationMissingAlert();
      }
    }

    // ADD HANDLING CANCELATION HERE
  };

  _toggleCancelModal = () => {
    if (this.props.status == 2) {
      this.setState({
        isCancelModalVisible: !this.state.isCancelModalVisible,
      });
    }

    // ADD HANDLING CANCELATION HERE
  };

  _showBillingInformationMissingAlert = () =>
    Alert.alert(
      'Missing Billing Information',
      'You must update your billing information before you can Squad Up for subscriptions',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          style: 'confirm',
          onPress: () => {
            this.props.navigation.navigate('Account', {
              user: this.state.data.user,
              token: this.state.data.token,
              activeTab: 1,
            });
          },
        },
      ],
      { cancelable: true }
    );

  render() {
    return (
      <Card style={{ overflow: 'hidden', borderRadius: 12 }}>
        <CardItem header style={{ justifyContent: 'space-between' }}>
          <Text style={{ color: 'black' }}>
            {this.state.data.owner}
          </Text>

          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: 'black',
              justifyContent: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: 'red', fontSize: 25, fontWeight: 'bold' }}>
                {this.state.data.title.charAt(0)}
              </Text>
            </View>
          </View>

          <Text>
            {this.state.data.price}
          </Text>
        </CardItem>
        <CardItem style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '200',
            }}
          >
            {this.state.data.title}
          </Text>
        </CardItem>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => alert('Account')}>
            <Text>Account</Text>
          </TouchableOpacity>

          <Text onPress={() => alert('Manage')} style={{ color: 'red' }}>
            <Text>Manage</Text>
          </Text>
        </CardItem>
      </Card>
    );
  }
}
