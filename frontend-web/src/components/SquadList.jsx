import React from 'react';
import SquardCard from './SquadCard';
import './SquadList.css';

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
  }
];

export default function SquadList(props) {
  return (
    <div className="squadList">
      {TEMP_LIST.map(squad => (
        <SquardCard key={squad.id} {...squad} />
      ))}
    </div>
  );
}
