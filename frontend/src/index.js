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
  uri: 'https://ianorak.com/api/graphql/'
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </BrowserRouter>
    </ApolloProvider>,
  document.getElementById("root")
);
