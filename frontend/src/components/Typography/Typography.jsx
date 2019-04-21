import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import typographyStyle from "assets/jss/components/typographyStyle.jsx";

function Typography({ ...props }) {
  const { classes, children, secondary, variant, ...rest } = props;
  const headingClasses = classNames({
    [classes[variant]]: true,
    [classes.secondary]: secondary
  });
  const Variant = variant == "subheading" ? "span" : `${variant}`;
  return (
    <Variant className={headingClasses} {...rest}>
      {children}
    </Variant>
  );
}

Typography.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
  secondary: PropTypes.bool
};

export default withStyles(typographyStyle)(Typography);
