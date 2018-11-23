import React from 'react';

import Layout from '../components/Layout';
import SearchTable from '../components/SearchTable';

function Dashboard(props) {
  return (
    <Layout rightTitle="Explore">
      <SearchTable />
    </Layout>
  );
}

export default Dashboard;
