import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Join from './pages/Join';
import Signup from './pages/Signup';

// import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div>
            <Route path="/" exact component={Dashboard} />
            <Route path="/create/" component={Create} />
            <Route path="/join/" component={Join} />
            <Route path="/signup" component={Signup} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
