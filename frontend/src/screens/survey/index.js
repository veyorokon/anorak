import React, { Component } from 'react';
import {
  Container,
  Button,
  Content,
  Text,
  Left,
  Header,
  Body,
  Form,
  Item,
  Label,
  Input,
  Icon,
} from 'native-base';
import styles from './styles';

const launchscreenBg = require('../../../assets/stars.jpg');
const launchscreenLogo = require('../../../assets/logo-kitchen-sink.png');

class Survey extends Component {
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
    };
  }

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
              <Text>Survey</Text>
            </Body>
          </Header>
          {/** FORM BEGIN **/}
          <Form>
            <Item floatingLabel>
              <Label>How much do you pay for phone service?</Label>
              <Input
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'email')}
              />
            </Item>
          </Form>

          <Form>
            <Item floatingLabel>
              <Label>What is the main reason for not signing up?</Label>
              <Input
                onChangeText={value =>
                  this.handleCredentialsInput(value, 'address')}
              />
            </Item>
          </Form>

          {/** FORM END **/}
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.handleSubmit()}
          >
            {/** SIGN UP **/}
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Survey;

// onPress={() => this.props.navigation.navigate("LoginRegister")}
// onPress={() => this.props.navigation.navigate("DrawerOpen")}
