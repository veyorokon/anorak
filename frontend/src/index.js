import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const hist = createBrowserHistory();

const client = new ApolloClient({
  uri: 'http://localhost:8000/api/graphql/'
  // uri: 'https://Anorak.xyz/api/graphql/'
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter history={hist} basename={process.env.PUBLIC_URL}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </BrowserRouter>
    </ApolloProvider>,
  document.getElementById("root")
);
