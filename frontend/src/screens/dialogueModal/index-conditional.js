import React, { Component } from 'react';
import { Modal, Alert, TouchableHighlight, View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Left,
  Header,
  Content,
  Icon,
  Body,
} from 'native-base';
import RadioGroup from 'react-native-radio-buttons-group';

import styles from './styles';

export default class DialogueModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        passwordConfirmation: '',
        email: '',
      },
      modalVisible: true,
      data: [
        {
          label: 'Yes',
        },
        {
          label: 'No',
        },
      ],
    };
  }
  onPress = data => {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.data[0].label;
    this.setState({ data });
    if (selectedButton == 'No') {
      this._showAlert();
    }
  };

  /**
   * [handleSubmit Sends a POST request to the server to register user]
   * @return {[type]} [returns none]
   */
  handleSubmit() {
    fetch('http://18.191.250.199:8000/user/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.credentials.username,
        first_name: this.state.credentials.first_name,
        last_name: this.state.credentials.last_name,
        password: this.state.credentials.password,
        email: this.state.credentials.email,
      }),
    })
      .then(response => {
        response.json();
        if (response.status == 201) {
          this.props.navigation.navigate('Onboarding');
        } else {
          throw new Error(response.status);
        }
      })
      .catch(err => {
        alert(JSON.stringify(err.message));
      });
  }

  /**
     * [handleCredentialsInput updates the credentials to be POSTed to the server]
     * @param  {[type]} value the new value to be added to the state
     * @param  {[type]} field the key to the credentials dictionary for the value
     * @return {[type]}       returns none
     */
  handleCredentialsInput(value, field) {
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = value;
    this.setState({
      credentials: newCredentials,
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _showAlert = () =>
    Alert.alert(
      'You Have Selected No',
      'Selecting No will result in you losing your current number.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            let newData = Object.assign(this.state.data);
            newData[0].selected = true;
            newData[1].selected = false;
            this.setState({
              data: newData,
            });
          },
        },
        {
          text: 'OK',
          style: 'confirm',
        },
      ],
      { cancelable: true }
    );

  render() {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.data[0].label;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <Container style={styles.container}>
            <Content>
              {/** BACK ARROW **/}
              <Header hasTabs>
                <Left>
                  <Button
                    transparent
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  >
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body />
              </Header>
              {/** FORM BEGIN **/}

              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 20,
                  marginTop: 50,
                  marginLeft: 20,
                }}
              >
                Would You Like To Keep Your Current Number: {selectedButton}
              </Text>
              <RadioGroup
                radioButtons={this.state.data}
                onPress={this.onPress}
                flexDirection="row"
              />
              {selectedButton == 'Yes'
                ? <View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 20,
                        marginTop: 50,
                        marginLeft: 20,
                      }}
                    >
                      Who is your current carrier?
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 20,
                        marginTop: 50,
                        marginLeft: 20,
                      }}
                    >
                      Enter your current account number:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 20,
                        marginTop: 50,
                        marginLeft: 20,
                      }}
                    >
                      Enter your current PIN:
                    </Text>
                  </View>
                : null}

              {/** FORM END **/}
              <Button
                block
                style={{ margin: 15, marginTop: 50 }}
                onPress={() => alert(selectedButton)}
              >
                {/** SIGN UP **/}
                <Text>Signup</Text>
              </Button>
            </Content>
          </Container>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
