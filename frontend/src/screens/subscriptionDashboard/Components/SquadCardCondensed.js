import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image } from 'react-native';
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
      <Card style={{ overflow: 'hidden', borderRadius: 8 }}>
        {/** TOP ROW **/}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              paddingTop: 10,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 44 / 2,
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
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

          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <CardItem>
              <Text style={{ fontSize: 16 }}>
                {this.state.data.price}
              </Text>
            </CardItem>
          </View>
        </View>

        {/** Owner ROW **/}

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              paddingHorizontal: 10,
            }}
          >
            <View>
              <Text>Owner: </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
            }}
          >
            <View>
              <Text>
                {this.state.data.owner}
              </Text>
            </View>
          </View>
        </View>

        {/* Status Row */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              paddingHorizontal: 10,
            }}
          >
            <View>
              <Text>Status: </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
            }}
          >
            <View>
              <Text>
                {this.state.data.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Menu Row */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-start',
              paddingLeft: 20,
            }}
          >
            <TouchableOpacity onPress={() => alert('Login pressed')}>
              <Text style={{ color: 'blue' }}>Login</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingBottom: 5,
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
      </Card>
    );
  }
}
