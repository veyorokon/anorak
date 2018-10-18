import React, { Component } from 'react';
import { Linking, TouchableOpacity, Alert } from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Center,
  Right,
  View,
} from 'native-base';
import SignupModal from './SignupModal';
import CancelModal from './CancelModal';

import './styles';

export default class SquadCard extends Component {
  state = {
    status: null,
    isSignupModalVisible: false,
    isCancelModalVisible: false,
    isBillingValid: this.props.isBillingValid,
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
              user: this.props.user,
              token: this.props.token,
              activeTab: 1,
            });
          },
        },
      ],
      { cancelable: true }
    );

  render() {
    return (
      <View>
        <Card style={{ overflow: 'hidden', borderRadius: 12 }}>
          <CardItem
            header
            style={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
          >
            <Text style={{ color: 'black' }}>
              {this.props.title}
            </Text>
            <Right>
              <Text>
                {this.props.price}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ paddingHorizontal: 10 }}>
                {this.props.body}
              </Text>
            </Body>
          </CardItem>
          <CardItem
            footer
            bordered
            style={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
          >
            <Left>
              <TouchableOpacity onPress={this._toggleSignupModal}>
                <Text>Test</Text>
              </TouchableOpacity>
            </Left>

            <Right>
              <Text
                onPress={() => {
                  Linking.openURL(this.props.termsLink);
                }}
                style={{ color: 'red' }}
              >
                {this.props.footer}
              </Text>
            </Right>
          </CardItem>
        </Card>
        <SignupModal
          visible={this.state.isSignupModalVisible}
          handleCloseModal={this._toggleSignupModal}
          user={this.props.user}
          token={this.props.token}
          onSuccess={() => {
            this.setState({ status: 1 });
          }}
        />

        <CancelModal
          visible={this.state.isCancelModalVisible}
          handleCloseModal={this._toggleCancelModal}
          user={this.props.user}
          token={this.props.token}
          onSuccess={() => {
            this.setState({ status: 1 });
          }}
        />
      </View>
    );
  }
}
