import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "assets/jss/layouts/homeStyle.jsx";

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.wrapper}>content</div>;
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homeStyle)(Home);
