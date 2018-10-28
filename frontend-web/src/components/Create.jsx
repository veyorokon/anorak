import React from 'react';
import TextInput from './TextInput.jsx'
import api from '../lib/api';

export default class Create extends React.Component {
  state = {
    email: '',
    name: '',
    payment_method: 'paypal',
    phone_number: '',
    cost_price: '',
    service: '',
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

  handleSubmit = async (ev) => {
    ev.preventDefault();
    await api.createSquad(this.state)
        .then(data => {
            console.log(data)
        })
  };

  onInputChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="Checkout">
        <h1>SquadUp</h1>
        <h2>Create a Squad</h2>

        <form onSubmit={this.handleSubmit}>
          {this.renderTextInput('name', 'Name')}
          {this.renderTextInput('phone_number', 'Phone')}
          {this.renderTextInput('email', 'Email')}
          <label>
            How should we pay you? (using the above email)
            <select name="payment_method" onChange={this.onInputChange}>
              <option value="paypal">PayPal</option>
              <option value="venmo">Venmo</option>
            </select>
          </label>
          <br />

          {this.renderTextInput('service', 'Service you\'re sharing (e.g. Netflix)')}
          <label>
            Price per member (this is what each member in your Squad will be charged)*
            <input
              type="number"
              placeholder="$3"
              name="cost_price"
              onChange={this.onInputChange}
              value={this.state.pricePerMember}
            />
          </label>
          <button>Create</button>
          <br />
          <br />
          <br />
          <label>* SquadUp retains a 25% fee</label>
        </form>
      </div>
    );
  }
}
