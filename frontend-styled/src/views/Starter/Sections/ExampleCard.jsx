import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import homeStyle from "assets/jss/views/homeStyle.jsx";

// Queries and Mutations

import { withRouter } from "react-router-dom";

class _HeroContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return <div>Test</div>;
  }
}

const HeroContent = _HeroContent;

function Hero(props) {
  return <HeroContent {...props} />;
}

_HeroContent.propTypes = {
  classes: PropTypes.object.isRequired
};

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homeStyle)(withRouter(Hero));
