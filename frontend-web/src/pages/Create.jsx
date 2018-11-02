import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import TextInput from '../components/TextInput.jsx';

import api from '../lib/api';

export default class Create extends React.Component {
  state = {
    email: '',
    name: '',
    payment_method: 'paypal',
    phone_number: '',
    cost_price: '',
    service: '',

    submitting: false,
    submittedSuccessfully: false,
    planId: null,
    error: null
  };

  renderTextInput(name, label) {
    return (
      <TextInput
        label={label}
        name={name}
        onChange={this.onInputChange}
        value={this.state[name]}
        required
      />
    );
  }
  handleSubmit = async ev => {
    ev.preventDefault();
    this.setState({ error: null, submitting: true }, async () => {
      try {
        const data = await api.createSquad(this.state);
        this.setState({ submittedSuccessfully: true, planId: data.squad_id });
      } catch (e) {
        this.setState({ error: e.message });
      } finally {
        this.setState({ submitting: false });
      }
    });
  };

  onInputChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="Checkout">
        <div className="loader-container">
          <BeatLoader
            loading={this.state.submitting}
            sizeUnit={'px'}
            size={60}
            color={'#36D7B7'}
          />
        </div>

        <div className={this.state.submitting ? 'transparent' : ''}>
          <h1>SquadUp</h1>

          {this.state.submittedSuccessfully ? (
            <div>
              <p>
                Congrats, you've created a Squad (ID: {this.state.planId}
                )! Here's the url that your Squad members can use to join your
                Squad.
              </p>
              <a
                href={`https://staging.squadup.xyz/join?planId=${
                  this.state.planId
                }`}
              >{`https://staging.squadup.xyz/join?planId=${
                this.state.planId
              }`}</a>
              <p>Here are some helpful reminders:</p>
              <ul>
                <li>You'll need to send your Squad your login information.</li>
                <li>You'll be paid on the last day of each month.</li>
              </ul>
            </div>
          ) : (
            <div>
              <h2>Create a Squad</h2>
              <form onSubmit={this.handleSubmit}>
                {this.renderTextInput('name', 'Name')}
                {this.renderTextInput('phone_number', 'Phone')}
                {this.renderTextInput('email', 'Email')}
                <label>
                  How should we pay you? (using the above email)
                  <select
                    name="payment_method"
                    onChange={this.onInputChange}
                    required
                  >
                    <option value="paypal">PayPal</option>
                    <option value="venmo">Venmo</option>
                  </select>
                </label>
                <br />

                {this.renderTextInput(
                  'service',
                  "Service you're sharing (e.g. Netflix)"
                )}
                <label>
                  Price per member (this is what each member in your Squad will
                  be charged per month)*
                  <input
                    type="number"
                    placeholder="3"
                    name="cost_price"
                    onChange={this.onInputChange}
                    value={this.state.pricePerMember}
                    required
                  />
                </label>
                <button disabled={this.state.submitting}>Create</button>
                {this.state.error && (
                  <div className="error">
                    <p>
                      <strong>
                        We're sorry, it looks like there was issue creating a
                        Squad.
                      </strong>
                    </p>
                    <p>Error: {this.state.error}</p>
                    <p>
                      Please try again and contact us if the issue persists.
                    </p>
                  </div>
                )}
                <br />
                <br />
                <br />
                <label>* SquadUp retains a 25% fee</label>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
