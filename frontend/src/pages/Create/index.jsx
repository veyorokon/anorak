import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import Layout from '../../components/Layout';
import Form from './Form';

function Create() {
  return (
    <StripeProvider apiKey="pk_live_BpssZcKZdOznYcltmEYbu3EH">
      <Layout rightTitle="Squad Creation">
        <Elements>
          <Form />
        </Elements>
      </Layout>
    </StripeProvider>
  );
}

export default Create;
