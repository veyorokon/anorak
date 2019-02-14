import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Elements, StripeProvider } from 'react-stripe-elements';

import BillingSection from './BillingSection';
import Layout from '../../components/v1/Layout';
import PaymentSection from './PaymentSection';
const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });
mixpanel.track('Account Page Load');

const styles = theme => ({
  forms: {
    display: 'flex'
  }
});

function Account(props) {
  const { classes } = props;
  return (
    <StripeProvider apiKey="pk_test_rLuroFoR4XKOxb3FbmJqTqrh">
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
