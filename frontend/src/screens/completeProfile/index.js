import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Item,
  Label,
  Input,
  Left,
  Body,
  Icon,
  Form,
  Text,
} from 'native-base';
import styles from './styles';

const DEBUG = false;

class CompleteProfile extends Component {
  constructor(props) {
    super(props);
    if (DEBUG) {
      var nextVal = this.genRandomValue();
      this.state = {
        submittingSignup: false,
        data: {
          credentials: {
            first_name: 'test' + nextVal + 'first_name',
            last_name: 'test' + nextVal + 'last_name',
            email: 'test' + nextVal + '@test.com',
            phoneNumber: nextVal,
          },
          address: {
            street: 'Street' + nextVal,
            city: 'City' + nextVal,
            state: 'State' + nextVal,
            zip: nextVal,
          },
          validation_token: nextVal,
        },
      };
    } else {
      this.state = {
        data: {
          credentials: {
            first_name: '',
            last_name: '',
            email: '',
            phoneNumber: this.props.navigation.state.params.phoneNumber,
          },
          address: { street: '', city: '', state: '', zip: '' },
          validation_token: this.props.navigation.state.params.validation_token,
        },
      };
    }
  }

  /**
 * Used in testing API to generate random value
 * @return {[type]} [description]
 */
  genRandomValue() {
    const min = 1;
    const max = 1000000;
    const rand = min + Math.random() * (max - min);
    return parseInt(rand);
  }

  _showRegistrationDuplicateEmailAlert = () =>
    Alert.alert(
      'Email Is Being Used',
      'Please enter an email that is not already taken.',
      [
        {
          text: 'OK',
          style: 'confirm',
        },
      ],
      { cancelable: true }
    );

  /**
   * handleRegistration Sends a POST request to the server to register user
   * @return {[type]} [returns none]
   */
  handleRegistration() {
    this.setState({ submittingSignup: true }, () => {
      fetch('http://18.191.250.199:8000/user/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.data),
      })
        .then(response => {
          response.json();
          if (response.status == 201) {
            this.props.navigation.navigate('Onboarding', {
              data: JSON.parse(response._bodyText),
            });
          } else {
            this._showRegistrationDuplicateEmailAlert();
          }
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
    let newCredentials = Object.assign(this.state.data);
    newCredentials[group][field] = value;
    this.setState({
      group: newCredentials,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          {/** BACK ARROW **/}
          <Header hasTabs>
            <Left>
              <Button
                transparent
                onPress={() =>
                  this.props.navigation.navigate('SubscriptionDeals')}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ justifyContent: 'flex-start' }}>
              <Text>Complete Profile</Text>
            </Body>
          </Header>
          {/** FORM BEGIN **/}
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize={'none'}
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'credentials', 'email')}
              />
            </Item>
          </Form>
          <Form
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Item floatingLabel last style={{ width: 49 + '%' }}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                onChangeText={value =>
                  this.handleCredentialsInput(
                    value,
                    'credentials',
                    'first_name'
                  )}
              />
            </Item>
            <Item floatingLabel last style={{ width: 49 + '%' }}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                onChangeText={value =>
                  this.handleCredentialsInput(
                    value,
                    'credentials',
                    'last_name'
                  )}
              />
            </Item>
          </Form>

          <Form>
            <Item floatingLabel>
              <Label>Street Address</Label>
              <Input
                autoCorrect={false}
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'address', 'street')}
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
                autoCorrect={false}
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'address', 'city')}
              />
            </Item>
            <Item floatingLabel last style={{ width: 19 + '%' }}>
              <Label>State</Label>
              <Input
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'address', 'state')}
              />
            </Item>
            <Item floatingLabel last style={{ width: 35 + '%' }}>
              <Label>Zip Code</Label>
              <Input
                autoCorrect={false}
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'address', 'zip')}
              />
            </Item>
          </Form>
          {/** FORM END **/}
          <Button
            block
            disabled={this.state.submittingSignup}
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.handleRegistration()}
          >
            {/** SIGN UP **/}
            <Text>Signup</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default CompleteProfile;
