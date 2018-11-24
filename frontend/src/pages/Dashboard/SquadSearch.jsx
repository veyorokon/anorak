import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import throttle from 'lodash/throttle';

import Search from '../../components/Search';
import SearchTable from '../../components/SearchTable';

const styles = theme => ({
  search: {
    marginBottom: '14px',
    marginLeft: '14px',
    marginRight: '14px'
  }
});

const SEARCH_SQUADS = gql`
  query SearchSquads($text: String!) {
    squadSearch(text: $text) {
      id
      costPrice
      currentSize
      maximumSize
      service
    }
  }
`;

const throttledSearch = throttle((text, reSearch) => reSearch(text), 700);

function SquadSearch(props) {
  const { classes } = props;
  return (
    <Query query={SEARCH_SQUADS} variables={{ text: '' }}>
      {({ data, refetch }) => {
        const reSearch = text => refetch({ text });
        return (
          <React.Fragment>
            <div className={classes.search}>
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
