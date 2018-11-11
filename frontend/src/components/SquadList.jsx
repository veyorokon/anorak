import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import SquardCard from './SquadCard';

const screenHeight = window.innerHeight * 0.83;

const styles = theme => ({
  squadList: {
    maxHeight: screenHeight,
    '& > *': {
      marginBottom: 20
    }
  }
});

const TEMP_LIST = [
  {
    id: 1,
    name: 'Netflix',
    price: 2,
    description:
      'Lorem ipsum dolor sit amet, consector apidciscing elit, sed do eiusmod tempor.'
  },
  {
    id: 2,
    name: 'Hulu',
    price: 3,
    description:
      'Lorem ipsum dolor sit amet, consector apidciscing elit, sed do eiusmod tempor.'
  },
  {
    id: 3,
    name: 'HBO',
    price: 3,
    description:
      'Lorem ipsum dolor sit amet, consector apidciscing elit, sed do eiusmod tempor.'
  },
  {
    id: 4,
    name: 'HBO',
    price: 3,
    description:
      'Lorem ipsum dolor sit amet, consector apidciscing elit, sed do eiusmod tempor.'
  },
  {
    id: 5,
    name: 'HBO',
    price: 3,
    description:
      'Lorem ipsum dolor sit amet, consector apidciscing elit, sed do eiusmod tempor.'
  }
];

function SquadList(props) {
  const { classes } = props;

  return (
    <List className={classes.squadList}>
      {TEMP_LIST.map(squad => (
        <SquardCard key={squad.id} {...squad} />
      ))}
    </List>
  );
}

SquadList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SquadList);
