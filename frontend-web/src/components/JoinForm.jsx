import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { withRouter } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import api from '../lib/api';
import TextInput from './TextInput.jsx';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        padding
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class _SplitForm extends React.Component {
  constructor(props) {
    super(props);

    const urlSearchParams = new URLSearchParams(props.location.search);
    this.state = {
      address1: '',
      address2: '',
      city: '',
      email: '',
      name: '',
      phone: '',
      serviceID: urlSearchParams.has('planId')
        ? urlSearchParams.get('planId')
        : '',
      state: '',
      cost: '',

      submitting: false,
      submittedSuccessfully: false,
      error: null
    };
  }

  componentWillMount() {
    api
      .getSquadPrice({
        serviceID: this.state.serviceID
      })
      .then(data => {
        if (data['price']) {
          var price = '$ ' + data['price'].toFixed(2);
        } else {
          price = '';
        }
        this.setState({ cost: price });
      });
  }

  onInputChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    this.setState({ error: null, submitting: true }, async () => {
      try {
        const payload = await this.props.stripe.createToken({
          name: this.state.name,
          address_line1: this.state.address1,
          address_line2: this.state.address2,
          address_city: this.state.city,
          address_state: this.state.state,
          address_country: 'US'
        });
        await api.setupSubscription({
          email: this.state.email,
          name: this.state.name,
          phone_number: this.state.phone,
          serviceID: this.state.serviceID,
          tokenID: payload.token.id
        });
        this.setState({ submittedSuccessfully: true });
      } catch (e) {
        this.setState({ error: e.message });
      } finally {
        this.setState({ submitting: false });
      }
    });
  };

  renderTextInput(name, label, required = true) {
    return (
      <TextInput
        label={label}
        name={name}
        onChange={this.onInputChange}
        value={this.state[name]}
        required={required}
      />
    );
  }

  renderSquadInput(name, label) {
    return (
      <TextInput
        label={label}
        name={name}
        onChange={this.findSquad}
        value={this.state[name]}
        required
      />
    );
  }

  findSquad = async ev => {
    const { name, value } = ev.target;
    ev.preventDefault();
    this.setState({ [name]: value }, async () => {
      await api
        .getSquadPrice({
          serviceID: this.state.serviceID
        })
        .then(data => {
          if (data['price']) {
            var price = '$ ' + data['price'].toFixed(2);
          } else {
            price = '';
          }
          this.setState({ cost: price });
        });
    });
  };

  renderFindSquad() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          {this.renderSquadInput('serviceID', 'Squad ID')}
        </div>
        <div
          style={{
            alignItems: 'center',
            paddingTop: 15,
            marginLeft: 15,
            display: 'flex'
          }}
        >
          {this.state.cost} {this.state.cost && ' Per Month'}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="loader-container">
          <BeatLoader
            loading={this.state.submitting}
            sizeUnit={'px'}
            size={60}
            color={'#36D7B7'}
          />
        </div>
        <div className={this.state.submitting ? 'transparent' : ''}>
          {this.state.submittedSuccessfully ? (
            <div>
              <p>Congrats, on joining {this.state.serviceID}!</p>
              <p>Here are some helpful reminders:</p>
              <ul>
                <li>
                  You'll need to ask your Squad owner for the login information
                  if they haven't sent it already.
                </li>
                <li>You'll be charged {this.state.cost} per month.</li>
              </ul>
            </div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {this.renderFindSquad()}
              </div>
              <br />
              <br />
              {this.renderTextInput('name', 'Full Name')}
              {this.renderTextInput('email', 'Email')}
              {this.renderTextInput('phone', 'Phone')}
              <br />

              <label>
                Card
                <CardElement {...createOptions(this.props.fontSize)} />
              </label>
              <br />

              {this.renderTextInput('address1', 'Billing Address (1)')}
              {this.renderTextInput('address2', 'Billing Address (2)', false)}
              {this.renderTextInput('city', 'Billing City')}
              {this.renderTextInput('state', 'Billing State')}
              <button disabled={this.state.submitting}>Squad Up</button>
              {this.state.error && (
                <div className="error">
                  <p>
                    <strong>
                      We're sorry, it looks like there was issue creating a
                      Squad.
                    </strong>
                  </p>
                  <p>Error: {this.state.error}</p>
                  <p>Please try again and contact us if the issue persists.</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }
}
const SplitForm = injectStripe(withRouter(_SplitForm));

export default SplitForm;
