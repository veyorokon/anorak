import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import MaterialButton from "@material-ui/core/Button";

import buttonLightStyle from "assets/jss/components/Button/buttonLightStyle.jsx";
import buttonDarkStyle from "assets/jss/components/Button/buttonDarkStyle.jsx";

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
    primary,
    size,
    className,
    muiClasses,
    loading,
    ...rest
  } = props;

  const disableRippleEffect = color == "plain" ? true : false;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.secondary]: secondary,
    [classes.primary]: primary,
    [classes.loading]: loading,
    [classes.disabled]: disabled,
    [classes.shadow]: shadow,
    [classes.link]: link,
    [className]: className
  });

  if (disabled) {
    return (
      <span className={classes.disabledWrapper}>
        <MaterialButton
          disableRipple={disableRippleEffect}
          {...rest}
          classes={muiClasses}
          className={btnClasses}
        >
          {icon && (
            <span className={[classes[iconPosition + "Icon"]]}>{icon}</span>
          )}
          {children}
        </MaterialButton>
      </span>
    );
  } else if (icon) {
    return (
      <MaterialButton
        disableRipple={disableRippleEffect}
        {...rest}
        classes={muiClasses}
        className={btnClasses}
      >
        <span className={[classes[iconPosition + "Icon"]]}>{icon}</span>
        {children}
      </MaterialButton>
    );
  }

  return (
    <MaterialButton
      disableRipple={disableRippleEffect}
      {...rest}
      classes={muiClasses}
      className={btnClasses}
    >
      {loading ? (
        <div className={classes.loadingDots}>
          <div />
          <div />
          <div />
        </div>
      ) : (
        [children]
      )}
    </MaterialButton>
  );
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["success", "warning", "highlight", "plain"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  shadow: PropTypes.bool,
  link: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object
};

const LightButton = withStyles(buttonLightStyle)(RegularButton);
const DarkButton = withStyles(buttonDarkStyle)(RegularButton);

function Button({ ...props }) {
  const { dark, ...rest } = props;
  const ButtonVariant = dark ? DarkButton : LightButton;
  return <ButtonVariant {...rest} />;
}

Button.defaultProps = {
  primary: true
};

Button.propTypes = {
  dark: PropTypes.bool
};

export default Button;
