import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

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
      default: '#F4F6F7'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/'
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    </ApolloProvider>
  );
}
