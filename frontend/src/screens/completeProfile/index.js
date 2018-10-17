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

class CompleteProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
      },
      password: { first: '', second: '' },
      credentials: {
        session_token: this.props.navigation.state.params.session_token,
        phone_number: this.props.navigation.state.params.phone_number,
      },
    };
  }

  show_duplicate_email_alert = () =>
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
   * send_registration_request Sends a POST request to the server to register user
   * @return {[type]} [returns none]
   */
  send_registration_request() {
    this.setState({ submittingSignup: true }, () => {
      const session_token = JSON.stringify(
        this.state.credentials.session_token
      );
      const email = this.state.data.email;
      const phone_number = this.state.credentials.phone_number;
      const password = this.state.password.first;
      fetch(
        'http://127.0.0.1:8000/api/users/creation/?session_token=' +
          session_token,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email: email,
              password: password,
              phone_number: phone_number,
            },
            session_token: session_token,
          }),
        }
      )
        .then(response => {
          response.json();
          if (response.status == 201) {
            this.props.navigation.navigate('Onboarding', {
              user: JSON.parse(response._bodyText),
            });
          } else {
            this.show_duplicate_email_alert();
          }
        })
        .finally(() => {
          this.setState({ submittingSignup: false });
        });
    });
  }

  /**
   * [update_user_information updates the credentials to be POSTed to the server]
   * @param  {[type]} value the new value to be added to the state
   * @param  {[type]} field the key to the credentials dictionary for the value
   * @return {[type]}       returns none
   */
  update_user_information(value, group, field) {
    let newCredentials = Object.assign(this.state);
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
                  this.update_user_information(value, 'data', 'email')}
              />
            </Item>
          </Form>

          <Form>
            <Item floatingLabel>
              <Label>Create Your Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={value =>
                  this.update_user_information(value, 'password', 'first')}
              />
            </Item>
          </Form>
          <Form>
            <Item floatingLabel>
              <Label>Password Confirmation</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={value =>
                  this.update_user_information(value, 'password', 'second')}
              />
            </Item>
          </Form>
          {/** FORM END **/}
          <Button
            block
            disabled={this.state.submittingSignup}
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.send_registration_request()}
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
