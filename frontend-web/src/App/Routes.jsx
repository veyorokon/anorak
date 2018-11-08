import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Pages from '../pages';

export default function Routes() {
  return (
    <Router>
      <div>
        <Route path="/dashboard" exact component={Pages.Dashboard} />
        <Route path="/create" component={Pages.Create} />
        <Route path="/join" component={Pages.Join} />
        <Route path="/signup" component={Pages.Signup} />
        <Route path="/account" component={Pages.Account} />
      </div>
    </Router>
  );
}
