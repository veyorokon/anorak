import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import Hero from "./Sections/Hero";

import Navbar from "../../components/Navbar/Navbar";
import homeStyle from "assets/jss/views/homeStyle.jsx";
import { withRouter } from "react-router-dom";

class _HomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Hero />
      </React.Fragment>
    );
  }
}
const HomeContent = withStyles(homeStyle)(_HomeContent);

function Home(props) {
  const { classes } = props;

  return <HomeContent {...props} />;
}

_HomeContent.propTypes = {
  classes: PropTypes.object.isRequired
};
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(homeStyle)(withRouter(Home));
