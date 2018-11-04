import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Join from './pages/Join';
import Signup from './pages/Signup';
import './App.css';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#f8be00'
    },
    primary: {
      main: '#2e2836'
    }
  }
});

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <MuiThemeProvider theme={theme}>
            <Route path="/" exact component={Dashboard} />
            <Route path="/create/" component={Create} />
            <Route path="/join/" component={Join} />
            <Route path="/signup" component={Signup} />
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
