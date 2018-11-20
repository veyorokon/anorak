import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import SquardCard from './SquadCard';

const screenHeight = window.innerHeight * 0.83;

const styles = theme => ({
  squadList: {
    maxHeight: screenHeight,
    '& > *': {
      marginBottom: 20
    },
    width: '100%'
  }
});

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
  const { classes } = props;

  return (
    <Query
      query={GET_USER}
      variables={{ token: window.localStorage.getItem('sessionToken') }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <List className={classes.squadList}>
            {data.user.squadMemberships.map(({ id, squad }) => (
              <SquardCard
                key={id}
                description={squad.description}
                price={squad.costPrice}
                service={squad.service}
                membershipID={squad.id}
              />
            ))}
          </List>
        );
      }}
    </Query>
  );
}

SquadList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SquadList);
