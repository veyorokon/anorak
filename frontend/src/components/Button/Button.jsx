import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import buttonStyle from "assets/jss/components/styles/buttonStyle.jsx";

function RegularButton({ ...props }) {
  const {
    classes,
    children,
    disabled,
    secondary,
    color,
    shadow,
    link,
    icon,
    iconPosition,

    round,
    simple,
    size,
    block,
    justIcon,
    className,
    muiClasses,
    loading,
    action,
    ...rest
  } = props;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.secondary]: secondary,
    [classes.loading]: loading,
    [classes.disabled]: disabled,
    [classes.shadow]: shadow,
    [classes.link]: link,

    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [classes.cardAction]: action,
    [className]: className
  });

  if (disabled && icon == null) {
    return (
      <span className={classes.disabledWrapper}>
        <Button {...rest} classes={muiClasses} className={btnClasses}>
          {children}
        </Button>
      </span>
    );
  }
  if (icon) {
    return (
      <Button {...rest} classes={muiClasses} className={btnClasses}>
        <span className={[classes[iconPosition + "Icon"]]}>{icon}</span>
        {children}
      </Button>
    );
  }

  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {loading ? (
        <div className={classes.loadingDots}>
          <div />
          <div />
          <div />
        </div>
      ) : (
        [children]
      )}
    </Button>
  );
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["success", "warning", "highlight"]),
  size: PropTypes.oneOf(["sm", "lg"]),
  secondary: PropTypes.bool,
  simple: PropTypes.bool,
  loading: PropTypes.bool,
  shadow: PropTypes.bool,
  link: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),

  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  justIcon: PropTypes.bool,
  action: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object
};

export default withStyles(buttonStyle)(RegularButton);
