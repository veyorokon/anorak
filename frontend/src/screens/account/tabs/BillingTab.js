import React, { Component } from 'react';
import {
  List,
  Item,
  Input,
  Label,
  Text,
  Form,
  Button,
  View,
} from 'native-base';
import { LiteCreditCardInput } from 'react-native-credit-card-input';
import { Alert } from 'react-native';

const apiKey = 'pk_test_rLuroFoR4XKOxb3FbmJqTqrh';
var stripe = require('stripe-client')(apiKey);

export default class BillingTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittingSignup: false,
      billing: {
        address_billing: this.props.address_billing,
        user: this.props.user,
        token: this.props.token,
      },
      card: {
        number: '', // 4242424242424242
        exp_month: '', // 09
        exp_year: '', // 18
        cvc: '', // 111
      },
    };
  }

  _showAlert = () =>
    Alert.alert(
      'Billing Information Updated',
      "You've successfully updated your billing information.",
      [
        {
          text: 'OK',
          style: 'confirm',
        },
      ],
      { cancelable: false }
    );

  getCardDict() {
    let data = Object.assign(this.state.card);
    data['name'] = this.state.billing.address_billing.name_on_card;
    data['address_line1'] = this.state.billing.address_billing.street;
    data['address_city'] = this.state.billing.address_billing.city;
    data['address_zip'] = this.state.billing.address_billing.zip;
    data['address_state'] = this.state.billing.address_billing.state;
    return data;
  }

  alertError(error) {
    if (error.code === 'missing_payment_information') {
      Alert.alert(
        'Missing Credit Card Number',
        'Please enter your credit card number.',
        [
          {
            text: 'OK',
            style: 'confirm',
          },
        ],
        { cancelable: false }
      );
    } else if (error.code === 'incorrect_number') {
      Alert.alert(
        'Incorrect Number',
        'Please enter a valid credit card number.',
        [
          {
            text: 'OK',
            style: 'confirm',
          },
        ],
        { cancelable: false }
      );
    } else if (error.code === 'parameter_missing') {
      let cond1 = error.param === 'card[exp_year]';
      let cond2 = error.param === 'card[exp_month]';
      if (cond1 || cond2) {
        Alert.alert(
          'Incorrect Expiration Date',
          'Please enter a valid expiration date.',
          [
            {
              text: 'OK',
              style: 'confirm',
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        'Incorrect Security Code',
        'Please enter a valid expiration CVC number.',
        [
          {
            text: 'OK',
            style: 'confirm',
          },
        ],
        { cancelable: false }
      );
    }
  }

  async processBilling() {
    const card = this.getCardDict();
    const token = await stripe.createToken({ card: card });
    if ('error' in token) {
      this.alertError(token.error);
    } else {
      this.setState({ submittingSignup: true }, () => {
        fetch('http://127.0.0.1:8000/updateStripe/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stripe_card_token: token,
            user_token: this.state.billing.token,
            email: this.state.billing.user.email,
            last_four: token.card.last4,
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
  }

  handleUpdate() {
    fetch('http://127.0.0.1:8000/updateBilling/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.billing.user,
        token: this.state.billing.token,
        address_billing: this.state.billing.address_billing,
      }),
    })
      .then(response => {
        response.json();
        if (response.status == 201) {
          this.processBilling();
        } else {
          throw new Error(response.status);
        }
      })
      .catch(err => {
        alert(JSON.stringify(err.message));
      });
  }

  handleCredentialsInput(value, data, group, field) {
    let newCredentials = Object.assign(this.state);
    newCredentials[data][group][field] = value;
    this.setState({
      group: newCredentials,
    });
  }

  _onChange = formData => {
    /* eslint no-console: 0 */
    let newCredentials = Object.assign(this.state.card);
    let expiry = formData.values.expiry.split('/');
    newCredentials.number = formData.values.number;
    newCredentials.exp_month = expiry[0];
    newCredentials.exp_year = expiry[1];
    newCredentials.cvc = formData.values.cvc;
    this.setState({
      card: newCredentials,
    });
    // alert(JSON.stringify(this.state.card));
  };

  componentDidMount() {
    this.refs.CCInput.setValues({
      number: this.state.billing.address_billing.last_four,
    });
  }

  render() {
    return (
      <List>
        <View
          style={{
            flexDirection: 'row',
            horizontal: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 25, marginTop: 30, marginBottom: 20 }}>
            Payment Method
          </Text>
        </View>
        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Item style={{ marginBottom: 20, width: 95 + '%' }}>
            <LiteCreditCardInput ref="CCInput" onChange={this._onChange} />
          </Item>
        </Form>

        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Item
            floatingLabel
            style={{
              width: 80 + '%',
            }}
          >
            <Label>Name on Card</Label>
            <Input
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.billing.address_billing.name_on_card}
              onChangeText={value =>
                this.handleCredentialsInput(
                  value,
                  'billing',
                  'address_billing',
                  'name_on_card'
                )}
            />
          </Item>
        </Form>

        <Form>
          <View
            style={{
              flexDirection: 'row',
              horizontal: 20,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 25, marginTop: 40 }}>Billing Address</Text>
          </View>

          <Item floatingLabel>
            <Label>Street Address</Label>
            <Input
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.billing.address_billing.street}
              onChangeText={value =>
                this.handleCredentialsInput(
                  value,
                  'billing',
                  'address_billing',
                  'street'
                )}
            />
          </Item>

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
                value={this.state.billing.address_billing.city}
                onChangeText={value =>
                  this.handleCredentialsInput(
                    value,
                    'billing',
                    'address_billing',
                    'city'
                  )}
              />
            </Item>

            <Item floatingLabel last style={{ width: 23 + '%' }}>
              <Label>State</Label>
              <Input
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.billing.address_billing.state}
                onChangeText={value =>
                  this.handleCredentialsInput(
                    value,
                    'billing',
                    'address_billing',
                    'state'
                  )}
              />
            </Item>
            <Item floatingLabel last style={{ width: 35 + '%' }}>
              <Label>Zip Code</Label>
              <Input
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.billing.address_billing.zip}
                onChangeText={value =>
                  this.handleCredentialsInput(
                    value,
                    'billing',
                    'address_billing',
                    'zip'
                  )}
              />
            </Item>
          </Form>
        </Form>

        {/** FORM END **/}
        <Button
          block
          disabled={this.state.submittingSignup}
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
