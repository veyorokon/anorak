import React from 'react';
import SquardCard from './SquadCard';
import './SquadList.css';
import List from '@material-ui/core/List';

const screenHeight = window.innerHeight * 0.83;

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

export default function SquadList(props) {
  return (
    <List
      className="squadList"
      style={{ maxHeight: screenHeight, overflow: 'auto' }}
    >
      {TEMP_LIST.map(squad => (
        <SquardCard key={squad.id} {...squad} />
      ))}
    </List>
  );
}
