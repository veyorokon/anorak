import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Pages from '../pages';

export default function Routes() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Pages.Landing} />
        <Route path="/home" component={Pages.Dashboard} />
      </div>
    </Router>
  );
}
