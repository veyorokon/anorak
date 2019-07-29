import React from "react";
import { Switch, Route } from "react-router-dom";

import routes from "routes.js";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class App extends React.Component {
  render() {
    return <div>{switchRoutes}</div>;
  }
}

export default App;
