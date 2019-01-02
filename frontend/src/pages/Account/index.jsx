import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Elements, StripeProvider } from 'react-stripe-elements';

import BillingSection from './BillingSection';
import Layout from '../../components/Layout';
import PaymentSection from './PaymentSection';
const mixpanel = require('mixpanel-browser');
mixpanel.init('3800b7f2e3b6602f2bd7ee5c6e5dac42', { debug: true, verbose: 1 });
mixpanel.track('Account Page Load');

const styles = theme => ({
  forms: {
    display: 'flex'
  }
});

function Account(props) {
  const { classes } = props;
  return (
    <StripeProvider apiKey="pk_live_BpssZcKZdOznYcltmEYbu3EH">
      <Layout rightTitle="Account">
        <div className={classes.forms}>
          <Elements>
            <BillingSection />
          </Elements>
          <PaymentSection />
        </div>
      </Layout>
    </StripeProvider>
  );
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
