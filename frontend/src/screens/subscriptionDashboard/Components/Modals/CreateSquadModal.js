import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
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
        <ScrollView>
          <View style={{ height: 50, marginTop: 22 }}>
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

          <View style={{ height: 500, alignItems: 'center', marginBottom: 50 }}>
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
                  <Label style={{ fontSize: 15 }}>
                    Netflix, Babysitting etc...
                  </Label>
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
                    Recommend no more than 10
                  </Label>
                  <Input
                    onChangeText={value =>
                      this.props.handleFormInput('maximum_size', value)}
                  />
                </Item>
              </Form>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 50 }}>
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

            <View style={{ alignItems: 'center', marginBottom: 50 }}>
              <Text>What's your username for this service?</Text>
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
                  <Label style={{ fontSize: 15 }}>Enter your username:</Label>
                  <Input
                    onChangeText={value =>
                      this.props.handleFormInput('username', value)}
                  />
                </Item>
              </Form>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 50 }}>
              <Text>What's your password for this service?</Text>
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
                  <Label style={{ fontSize: 15 }}>Enter your password:</Label>
                  <Input
                    onChangeText={value =>
                      this.props.handleFormInput('password', value)}
                  />
                </Item>
              </Form>
            </View>
          </View>

          <View
            style={{
              height: 150,
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: 50,
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
        </ScrollView>
      </Modal>
    );
  }
}
