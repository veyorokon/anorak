import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Form, Item, Label, Input, Icon } from 'native-base';
import styles from './styles';

export default class createSquadModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, marginTop: 22 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.title}>Create A Squad...</Text>
          </View>

          <View style={{ paddingLeft: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.toggleModal();
              }}
            >
              <Icon name="md-arrow-back" style={{ color: 'black' }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 6, alignItems: 'center' }}>
          <View style={{ marginBottom: 50, alignItems: 'center' }}>
            <Text>What subscription are you adding?</Text>
            <Form
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Item
                floatingLabel
                last
                style={{ flexDirection: 'row', width: 60 + '%' }}
              >
                <Label style={{ fontSize: 15 }}>Netflix, Spotify etc...</Label>
                <Input
                  onChangeText={value =>
                    this.props.handleFormInput('service', value)}
                />
              </Item>
            </Form>
          </View>

          <View style={{ alignItems: 'center', marginBottom: 50 }}>
            <Text>How many people can join?</Text>
            <Form
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Item
                floatingLabel
                last
                style={{ flexDirection: 'row', width: 60 + '%' }}
              >
                <Label style={{ fontSize: 15 }}>
                  Enter a number to a max of 10
                </Label>
                <Input
                  onChangeText={value =>
                    this.props.handleFormInput('maximum_size', value)}
                />
              </Item>
            </Form>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text>How much will you charge each member?</Text>
            <Form
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Item
                floatingLabel
                last
                style={{ flexDirection: 'row', width: 60 + '%' }}
              >
                <Label style={{ fontSize: 15 }}>
                  Enter a price (e.g. 1.75)
                </Label>
                <Input
                  onChangeText={value =>
                    this.props.handleFormInput('cost_price', value)}
                />
              </Item>
            </Form>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.onSubmit();
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
