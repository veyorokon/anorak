import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

import Checkout from './components/Checkout'
import './App.css';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Checkout />
      </StripeProvider>
    );
  }
}

export default App;