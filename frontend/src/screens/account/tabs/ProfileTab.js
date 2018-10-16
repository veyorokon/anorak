import React, { Component } from 'react';
import { Button, Item, Label, List, Input, Form, Text } from 'native-base';
import { Alert } from 'react-native';
import './styles';

export default class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittingSignup: false,
      address_home: this.props.address_home,
      user: this.props.user,
      token: this.props.token,
    };
    //alert(JSON.stringify(this.state.token));
  }

  _showAlert = () =>
    Alert.alert(
      'Account Profile Updated',
      "You've successfully updated your account information.",
      [
        {
          text: 'OK',
          style: 'confirm',
        },
      ],
      { cancelable: false }
    );

  /**
   * [handleRegistration Sends a POST request to the server to register user]
   * @return {[type]} [returns none]
   */
  handleUpdate() {
    this.setState({ submittingSignup: true }, () => {
      fetch('http://127.0.0.1:8000/updateProfile/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.state.user,
          token: this.state.token,
          address_home: this.state.address_home,
        }),
      })
        .then(response => {
          response.json();
          if (response.status == 201) {
            this._showAlert();
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
  handleCredentialsInput(value, group, field) {
    let newCredentials = Object.assign(this.state);
    newCredentials[group][field] = value;
    this.setState({
      group: newCredentials,
    });
  }

  render() {
    return (
      <List>
        <Form>
          <Item floatingLabel>
            <Label>Phone Number</Label>
            <Input
              disabled={true}
              value={this.state.user.phone_number}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'user', 'phone_number')}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.user.email}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'user', 'email')}
            />
          </Item>
        </Form>
        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Item floatingLabel style={{ maxWidth: 48 + '%' }}>
            <Label>First Name</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.user.first_name}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'user', 'first_name')}
            />
          </Item>
          <Item floatingLabel style={{ maxWidth: 48 + '%' }}>
            <Label>Last Name</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.user.last_name}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'user', 'last_name')}
            />
          </Item>
        </Form>

        <Form>
          <Item floatingLabel>
            <Label>Street Address</Label>
            <Input
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.address_home.street}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'address_home', 'street')}
            />
          </Item>
        </Form>
        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Item floatingLabel last style={{ width: 40 + '%' }}>
            <Label>City</Label>
            <Input
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.address_home.city}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'address_home', 'city')}
            />
          </Item>
          <Item floatingLabel last style={{ width: 20 + '%' }}>
            <Label>State</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.address_home.state}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'address_home', 'state')}
            />
          </Item>
          <Item floatingLabel last style={{ width: 35 + '%' }}>
            <Label>Zip Code</Label>
            <Input
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.address_home.zip}
              onChangeText={value =>
                this.handleCredentialsInput(value, 'address_home', 'zip')}
            />
          </Item>
        </Form>
        {/** FORM END **/}
        <Button
          disabled={this.state.submittingSignup}
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={() => this.handleUpdate()}
        >
          {/** SIGN UP **/}
          <Text>Save</Text>
        </Button>
      </List>
    );
  }
}
