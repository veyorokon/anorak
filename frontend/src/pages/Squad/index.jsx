import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Layout from '../../components/Layout';
import SquadOverviewCard from '../../components/SquadOverviewCard';

const GET_SQUAD = gql`
  query GetSquad($token: String!, $squadID: Int!) {
    squad(token: $token, squadID: $squadID) {
      id
      costPrice
      description
      secret
      service
    }
  }
`;

class SquadPage extends React.Component {
  render() {
    return (
      <Query
        query={GET_SQUAD}
        variables={{
          token: window.localStorage.getItem('sessionToken'),
          squadID: this.props.match.params.id
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const { squad } = data;
          return (
            <Layout rightTitle="Squad">
              <SquadOverviewCard
                description={squad.description}
                price={squad.costPrice}
                service={squad.service}
                membershipID={squad.id}
              />
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export default SquadPage;
