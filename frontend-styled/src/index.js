import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Home from "layouts/Home.jsx";

import { ThemeProvider } from "styled-components";
import theme from "assets/style/theme";

// core components

import "assets/css/styles.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
