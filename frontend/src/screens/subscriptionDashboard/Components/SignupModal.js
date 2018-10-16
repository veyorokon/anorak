import React, { Component } from 'react';
import { Modal, Alert, View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Left,
  Header,
  Content,
  Icon,
  Item,
  Label,
  Body,
  Input,
  Form,
} from 'native-base';
import RadioGroup from 'react-native-radio-buttons-group';

import styles from './styles';

export default class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      credentials: {
        isKeepingNumber: 1,
        carrier: '',
        accountNumber: '',
        accountPIN: '',
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
      submittingSignup: false,
    };
  }
  onPress = data => {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.data[0].label;
    this.setState({ data });
    if (selectedButton == 'No') {
      let newCredentials = Object.assign(this.state.credentials);
      newCredentials['isKeepingNumber'] = 0;
      this.setState({
        credentials: newCredentials,
      });
      this._showAlert();
    } else {
      let newCredentials = Object.assign(this.state.credentials);
      newCredentials['isKeepingNumber'] = 1;
      this.setState({
        credentials: newCredentials,
      });
    }
  };

  /**
   * [handleSubmit Sends a POST request to the server to register user]
   * @return {[type]} [returns none]
   */
  handleSubscribe() {
    this.setState({ submittingSignup: true }, () => {
      fetch('http://127.0.0.1:8000/subscriptionSignup/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credentials: this.state.credentials,
          username: this.props.user.profile.username,
          token: this.props.token,
        }),
      })
        .then(response => {
          response.json();
          if (response.status == 200) {
            this._showSuccessAlert();
            this.props.onSuccess();
          } else {
            throw new Error(response.status);
          }
        })
        .catch(err => {
          alert(JSON.stringify(err.message));
        })
        .finally(() => {
          this.setState({ submittingSignup: false });
        });
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
    //alert(JSON.stringify(this.state.credentials));
  }

  _showAlert = () =>
    Alert.alert(
      'You Have Selected No',
      'Selecting No will result in you having a new cellphone number.',
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
            this.handleCredentialsInput(1, 'isKeepingNumber');
          },
        },
        {
          text: 'OK',
          style: 'confirm',
        },
      ],
      { cancelable: true }
    );

  _showSuccessAlert = () =>
    Alert.alert(
      'Success!',
      "Your order may take up to 24 hours to process. Once complete, your status will show 'Subscribed' and if needed, we'll mail you your new SIM card with instructions!",
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.handleCloseModal();
          },
        },
      ],
      { cancelable: false }
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
          visible={this.props.visible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <Container style={styles.container}>
            <Content>
              {/** BACK ARROW **/}
              <Header hasTabs>
                <Left style={{ flex: 0, width: 10 + '%' }}>
                  <Button transparent onPress={this.props.handleCloseModal}>
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body style={{ width: 100 + '%', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>Phone Data Plan</Text>
                </Body>
              </Header>
              {/** FORM BEGIN **/}

              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 20,
                  marginTop: 50,
                  marginLeft: 20,
                  width: 80 + '%',
                }}
              >
                Would You Like To Keep Your Current Number: {selectedButton}
              </Text>
              <RadioGroup
                radioButtons={this.state.data}
                onPress={this.onPress}
                flexDirection="row"
              />
              <Form>
                <Item floatingLabel>
                  <Label>Who is your current carrier?</Label>
                  <Input
                    clearButtonMode="always"
                    onChangeText={value =>
                      this.handleCredentialsInput(value, 'carrier')}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Enter your current account number:</Label>
                  <Input
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={value =>
                      this.handleCredentialsInput(value, 'accountNumber')}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Enter your current PIN:</Label>
                  <Input
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={value =>
                      this.handleCredentialsInput(value, 'accountPIN')}
                  />
                </Item>
              </Form>

              {/** FORM END **/}
              <Button
                disabled={this.state.submittingSignup}
                block
                style={{ margin: 16, marginTop: 50 }}
                onPress={() => this.handleSubscribe()}
              >
                {/** SIGN UP **/}
                <Text>Signup</Text>
              </Button>
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}
