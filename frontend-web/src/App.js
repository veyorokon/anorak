import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from './components/Checkout'
import Create from './components/Create'

import './App.css';

class App extends Component {
    
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Join} />
          <Route path="/create/" component={Create} />
          <Route path="/join/" component={Join} />
        </div>
      </Router>
    );
  }
}

export default App;
