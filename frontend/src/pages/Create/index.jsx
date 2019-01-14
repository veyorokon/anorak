import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import Layout from '../../components/v1/Layout';
import Form from './Form';

function Create() {
  return (
    <StripeProvider apiKey="pk_test_rLuroFoR4XKOxb3FbmJqTqrh">
      <Layout rightTitle="Squad Creation">
        <Elements>
          <Form />
        </Elements>
      </Layout>
    </StripeProvider>
  );
}

export default Create;
