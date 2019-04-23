import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import typographyStyle from "assets/jss/components/Typography/typographyStyle.jsx";

function Paragraph({ ...props }) {
  const { classes, children, tertiary, secondary, variant, ...rest } = props;
  const paragraphClasses = classNames({
    [classes.p]: true,
    [classes.secondary]: secondary,
    [classes.tertiary]: tertiary
  });

  return (
    <p className={paragraphClasses} {...rest}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool
};

export default withStyles(typographyStyle)(Paragraph);
