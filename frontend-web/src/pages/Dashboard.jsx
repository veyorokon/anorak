import React from 'react';

import BottomNav from '../components/BottomNav';
import SquadList from '../components/SquadList';

export default function Dashboard(props) {
  return (
    <div>
      <SquadList />
      <BottomNav />
    </div>
  );
}
