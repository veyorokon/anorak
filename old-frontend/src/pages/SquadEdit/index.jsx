import React from 'react';
import Grid from '@material-ui/core/Grid';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Layout from '../../components/v1/Layout';
import Form from './Form';
import InviteForm from './InviteForm';
import Invites from './Invites';

const GET_SQUAD = gql`
  query GetSquad($token: String!, $squadID: Int!) {
    squad(token: $token, squadID: $squadID) {
      id
      members {
        id
        status
        user {
          id
          email
        }
      }
      description
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
        const invites = squad.members
          .filter(member => member.status === 'invited')
          .map(member => ({
            id: member.id,
            email: member.user.email
          }));
        return (
          <Layout rightTitle="Manage Squad">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Form
                  description={squad.description}
                  membershipID={squad.id}
                  secret={squad.secret}
                  service={squad.service}
                  squadId={squad.id}
                />
              </Grid>
              <Grid item xs={12}>
                <InviteForm squadId={squad.id} />
              </Grid>
              <Grid item xs={12}>
                <Invites invites={invites} />
              </Grid>
            </Grid>
          </Layout>
        );
      }}
    </Query>
  );
}

export default Edit;
