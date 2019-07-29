import React from "react";

import { withRouter } from "react-router-dom";

class _HomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div>test</div>
      </React.Fragment>
    );
  }
}
const HomeContent = _HomeContent;

function Home(props) {
  return <HomeContent {...props} />;
}

export default withRouter(Home);
