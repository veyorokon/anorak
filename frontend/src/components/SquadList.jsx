import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import SquardCard from './SquadCard';

const styles = theme => ({});

const GET_USER = gql`
  query GetUser($token: String!) {
    user(token: $token) {
      id
      squadMemberships {
        id
        squad {
          id
          costPrice
          description
          service
        }
      }
    }
  }
`;

function SquadList(props) {
  // const { classes } = props;
  return (
    <Query
      query={GET_USER}
      variables={{ token: window.localStorage.getItem('sessionToken') }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Grid container direction="column" alignItems="center" spacing={24}>
            {data.user.squadMemberships.map(({ id, squad }) => (
              <Grid key={id} item>
                <SquardCard
                  description={squad.description}
                  price={squad.costPrice}
                  service={squad.service}
                  membershipID={id}
                />
              </Grid>
            ))}
          </Grid>
        );
      }}
    </Query>
  );
}

SquadList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SquadList);
