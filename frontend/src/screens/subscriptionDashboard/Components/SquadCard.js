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
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <CardItem>
              <Text style={{ color: 'black', fontSize: 18 }}>
                {this.state.data.owner}
              </Text>
            </CardItem>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <CardItem>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 52 / 2,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={{ color: 'red', fontSize: 26 }}>
                    {this.state.data.title.charAt(0)}
                  </Text>
                </View>
              </View>
            </CardItem>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end', fontSize: 18 }}>
            <CardItem header>
              <View>
                <Text style={{ color: 'black' }}>
                  {this.state.data.status}
                </Text>
              </View>
            </CardItem>
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}
        >
          <View style={{ justifyContent: 'flex-start' }}>
            <CardItem style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: '300',
                  letterSpacing: 10,
                }}
              >
                {this.state.data.title}
              </Text>
            </CardItem>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <View style={{ justifyContent: 'flex-end', padding: 10 }}>
            <TouchableOpacity onPress={() => alert('Account')}>
              <Text>Account</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: 'black' }}>
              {this.state.data.price}
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-end', padding: 10 }}>
            <TouchableOpacity onPress={() => alert('Manage')}>
              <Text>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  }
}

{
  /* <View
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
  {this.state.data.status}
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

<Text>
  {this.state.data.price}
</Text>

<Text onPress={() => alert('Manage')} style={{ color: 'red' }}>
  <Text>Manage</Text>
</Text> */
}
