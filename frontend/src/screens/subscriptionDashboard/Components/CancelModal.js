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

export default class CancelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      credentials: {
        isCancelling: 0,
      },
      submittingCancellation: false,
      modalVisible: true,
      data: [
        {
          label: 'No',
        },
        {
          label: 'Yes',
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
    if (selectedButton == 'Yes') {
      let newCredentials = Object.assign(this.state.credentials);
      newCredentials['isCancelling'] = 1;
      this.setState({
        credentials: newCredentials,
      });
      this._showAlert();
    } else {
      let newCredentials = Object.assign(this.state.credentials);
      newCredentials['isCancelling'] = 0;
      this.setState({
        credentials: newCredentials,
      });
    }
  };

  /**
   * [handleSubmit Sends a POST request to the server to register user]
   * @return {[type]} [returns none]
   */
  handleCancellation() {
    this.setState({ submittingCancellation: true }, () => {
      fetch('http://127.0.0.1:8000/subscriptionCancel/', {
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
          this.setState({ submittingCancellation: false });
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
      'Are You Sure?',
      'Canceling your plan will terminate your service.',
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            let newData = Object.assign(this.state.data);
            newData[0].selected = true;
            newData[1].selected = false;
            this.setState({
              data: newData,
            });
            this.handleCredentialsInput(0, 'isCancelling');
          },
        },
        {
          text: 'Yes',
          style: 'confirm',
        },
      ],
      { cancelable: true }
    );

  _showSuccessAlert = () =>
    Alert.alert(
      'Cancellation Request Sent.',
      'Your cancellation request is being processed.',
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
    const isCancelButtonDisabled =
      !this.state.credentials.isCancelling || this.state.submittingCancellation;
    const buttonColor = isCancelButtonDisabled ? 'grey' : 'red';
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
                  <Text style={{ fontSize: 20 }}>
                    Cancellation Request Form
                  </Text>
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
                Are you sure you want to cancel? {selectedButton}
              </Text>
              <RadioGroup
                radioButtons={this.state.data}
                onPress={this.onPress}
                flexDirection="row"
              />

              {/** FORM END **/}
              <Button
                disabled={isCancelButtonDisabled}
                block
                style={{
                  margin: 16,
                  marginTop: 50,
                  backgroundColor: buttonColor,
                }}
                onPress={() => this.handleCancellation()}
              >
                {/** UNSUBSCRIBE **/}
                <Text>Unsubscribe</Text>
              </Button>
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}
