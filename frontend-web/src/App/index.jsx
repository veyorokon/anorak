import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Routes from './Routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2e2836'
    },
    secondary: {
      main: '#f8be00'
    },
    background: {
      default: '#eaeded'
    }
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes fb={window.FB} />
    </MuiThemeProvider>
  );
}
