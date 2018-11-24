import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Layout from '../../components/Layout';
import Form from './Form';

const GET_SQUAD = gql`
  query GetSquad($token: String!, $squadID: Int!) {
    squad(token: $token, squadID: $squadID) {
      id
      description
      isPublic
      maximumSize
      secret
      service
    }
  }
`;

function Edit(props) {
  return (
    <Query
      query={GET_SQUAD}
      variables={{
        token: window.localStorage.getItem('sessionToken'),
        squadID: props.match.params.id
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { squad } = data;
        return (
          <Layout rightTitle="Squad Edit">
            <Form
              description={squad.description}
              maxSize={squad.maximumSize}
              membershipID={squad.id}
              isPublic={squad.isPublic}
              secret={squad.secret}
              service={squad.service}
              squadId={squad.id}
            />
          </Layout>
        );
      }}
    </Query>
  );
}

export default Edit;
