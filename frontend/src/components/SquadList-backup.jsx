import React from 'react';
import SquardCard from './SquadCard';

const TEMP_LIST = [{}, {}, {}];

export default function SquadList(props) {
  return TEMP_LIST.map(squad => <SquardCard squad={squad} />);
}
