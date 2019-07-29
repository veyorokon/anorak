import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

class _ExampleContent extends React.Component {
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
const ExampleContent = _ExampleContent;

function Example(props) {
  return <ExampleContent {...props} />;
}

export default withRouter(Example);
