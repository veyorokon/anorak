import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import JoinForm from './JoinForm';

export default class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }

  render() {
    const { elementFontSize } = this.state;
    return (
      // <StripeProvider apiKey="pk_test_rLuroFoR4XKOxb3FbmJqTqrh">
      <StripeProvider apiKey="pk_live_BpssZcKZdOznYcltmEYbu3EH">
        <div className="Checkout">
          <h1>SquadUp</h1>
          <h2>Join a Squad</h2>
          <Elements>
            <JoinForm fontSize={elementFontSize} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}
