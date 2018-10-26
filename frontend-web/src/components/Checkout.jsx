import React from 'react';
import {
  CardElement,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
import api from '../lib/api';
// 
// const api = {
//   setupSubscription(args) {
//     console.log(args)
//   }
// }

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class TextInput extends React.Component {
  render() {
    return (
      <label>
        {this.props.label}
        <input
          type="text"
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </label>
    )
  }
}

class _SplitForm extends React.Component {
  state = {
    address1: '',
    address2: '',
    city: '',
    email: '',
    name: '',
    phone: '',
    serviceID: '',
    state: '',
  };

  onInputChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const payload = await this.props.stripe.createToken({
      name: this.state.name,
      address_line1: this.state.address1,
      address_line2: this.state.address2,
      address_city: this.state.city,
      address_state: this.state.state,
      address_country: 'US',
    });
    await api.setupSubscription({
      email: this.state.email,
      name: this.state.name,
      phone_number: this.state.phone,
      serviceID: this.state.serviceID,
      tokenID: payload.token.id,
    })
  };

  renderTextInput(name, label) {
    return (
      <TextInput
        label={label}
        name={name}
        onChange={this.onInputChange}
        value={this.state[name]}
      />
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderTextInput('serviceID', 'Service ID')}
        {this.renderTextInput('name', 'Name')}
        {this.renderTextInput('email', 'Email')}
        {this.renderTextInput('phone', 'Phone')}
        <br />

        <label>
          Card
          <CardElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <br />

        {this.renderTextInput('address1', 'Address (1)')}
        {this.renderTextInput('address2', 'Address (2)')}
        {this.renderTextInput('city', 'City')}
        {this.renderTextInput('state', 'State')}
        <button>Pay</button>
      </form>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'});
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({elementFontSize: '18px'});
      }
    });
  }

  render() {
    const {elementFontSize} = this.state;
    return (
      <div className="Checkout">
        <h1>SquadUp</h1>
        <h2>Join a Squad</h2>
        <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
      </div>
    );
  }
}
