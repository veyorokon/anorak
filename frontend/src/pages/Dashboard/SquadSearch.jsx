import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import throttle from 'lodash/throttle';

import Search from '../../components/Search';
import SearchTable from '../../components/SearchTable';

const styles = theme => ({
  searchSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '14px',
    marginLeft: '14px',
    marginRight: '14px'
  },
  resultsSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    '& > *': {
      marginBottom: 10,
      marginRight: 7
    }
  },
  subtitle: {
    flexBasis: '25%'
  }
});

export const SEARCH_SQUADS = gql`
  query SearchSquads($text: String!, $token: String) {
    squadSearch(text: $text, token: $token) {
      id
      costPrice
      currentSize
      currentUserStatus
      maximumSize
      service
      description
      owner
      image
    }
  }
`;

const throttledSearch = throttle((text, reSearch) => reSearch(text), 700);

function SquadSearch(props) {
  const { classes } = props;
  return (
    <Query
      query={SEARCH_SQUADS}
      variables={{
        text: '',
        token: window.localStorage.getItem('sessionToken')
      }}
    >
      {({ data, refetch }) => {
        const reSearch = text => refetch({ text });
        return (
          <React.Fragment>
            <div className={classes.searchSection}>
              <Typography className={classes.subtitle} variant="body2">
                Create. Discover. Subscribe.
              </Typography>
              <Search onSearch={text => throttledSearch(text, reSearch)} />
            </div>

            <SearchTable squads={data.squadSearch || []} />
          </React.Fragment>
        );
      }}
    </Query>
  );
}

SquadSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SquadSearch);
