import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Pages from '../pages';

export default function Routes() {
  return (
    <Router>
      <div>
        <Route path="/" component={Pages.Landing} />
        <Route path="/account" component={Pages.Account} />
        <Route path="/create" component={Pages.Create} />
        <Route path="/squads" component={Pages.Dashboard} />
        <Route path="/discover" component={Pages.Discover} />
        <Route path="/payout" component={Pages.Payout} />
        <Route path="/login" component={Pages.Login} />
        <Route path="/signup" component={Pages.Signup} />
        <Route path="/squads/:id" exact component={Pages.Squad} />
        <Route path="/squads/:id/edit" component={Pages.SquadEdit} />
      </div>
    </Router>
  );
}
