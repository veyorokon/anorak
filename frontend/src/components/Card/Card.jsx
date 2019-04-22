import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardStyle from "assets/jss/components/styles/cardStyle.jsx";

function Card({ ...props }) {
  const { classes, className, children, dark, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.dark]: dark,
    [className]: className !== undefined
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool
};

export default withStyles(cardStyle)(Card);
