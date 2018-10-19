import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Card, CardItem, Text, View } from 'native-base';
//import SignupModal from './SignupModal';
//import CancelModal from './CancelModal';

import './styles';

export default class SquadCardExpanded extends Component {
  state = {
    data: this.props.data,
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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
          <View style={{ flex: 1, alignItems: 'flex-start', paddingTop: 10 }}>
            <CardItem>
              <Text style={{ color: 'black', fontSize: 18 }}>
                {this.state.data.owner}
              </Text>
            </CardItem>
          </View>
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 3 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 52 / 2,
                backgroundColor: 'black',
                justifyContent: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: 'red', fontSize: 26 }}>
                  {this.state.data.title.charAt(0)}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 10 }}>
            <CardItem>
              <Text style={{ color: 'black', fontSize: 18 }}>
                {this.state.data.status}
              </Text>
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
                  fontWeight: 'bold',
                  letterSpacing: 7,
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
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{ flex: 1, alignItems: 'flex-start', paddingBottom: 10 }}
          >
            <CardItem>
              <TouchableOpacity onPress={() => alert('Account')}>
                <Text style={{ fontSize: 18 }}>Account</Text>
              </TouchableOpacity>
            </CardItem>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <CardItem>
              <Text style={{ fontSize: 18 }}>
                {this.state.data.price}
              </Text>
            </CardItem>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end', paddingBottom: 10 }}>
            <CardItem>
              <TouchableOpacity onPress={() => alert('Manage')}>
                <Text style={{ fontSize: 18 }}>Manage</Text>
              </TouchableOpacity>
            </CardItem>
          </View>
        </View>
      </Card>
    );
  }
}
