import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { Card, CardItem, Text, View } from 'native-base';
//import SignupModal from './SignupModal';
//import CancelModal from './CancelModal';

import './styles';

export default class SquadCard extends Component {
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
      <Card style={{ overflow: 'hidden', borderRadius: 40 }}>
        {/** MAIN ROW **/}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          {/** COLUMN 1 - LOGIN **/}
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 10,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity onPress={() => alert('Login Information')}>
              <Image
                source={require('../../../../assets/login-circle-bold.png')}
                style={{
                  height: 55,
                  width: 55,
                  tintColor: '#307FF6',
                }}
              />
            </TouchableOpacity>
          </View>

          {/** COLUMN 2 - TITLE **/}
          <View
            style={{
              flex: 4,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <CardItem style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}
              >
                {this.state.data.title}
              </Text>
            </CardItem>
          </View>

          {/** COLUMN 3 - OVERVIEW **/}
          <View
            style={{
              flex: 3,
              padding: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text>
                {this.state.data.status}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <Text>
                {this.state.data.price}
              </Text>
            </View>
          </View>

          {/** COLUMN 4 - DOTS **/}
          <View
            style={{
              flex: 1,
              padding: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity onPress={() => alert('Menu pressed')}>
                <Image
                  source={require('../../../../assets/menu-dots-vertical.png')}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}
