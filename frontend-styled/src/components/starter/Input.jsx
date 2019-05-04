import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import inputStyle from "assets/jss/components/Input/inputStyle";

function Input({ ...props }) {
  const { classes, id } = props;

  // const labelClasses = classNames({
  //   [" " + classes.labelRootError]: error,
  // });

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>Test</div>
    </div>
  );
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string
};

export default withStyles(inputStyle)(Input);
