import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight, Alert } from 'react-native';

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
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>JOIN SQUAD!</Text>

            <TouchableHighlight
              onPress={() => {
                this.props.toggleModal();
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
