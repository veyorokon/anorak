import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";

function Card({ ...props }) {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    chart,
    black,
    subscription,
    subscriptionLight,
    primary,
    main,
    add,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardPrimary]: primary,
    [classes.cardProfile]: profile,
    [classes.cardBlack]: black,
    [classes.cardSubscriptionLight]: subscriptionLight,
    [classes.cardChart]: chart,
    [classes.cardSubscription]: subscription,
    [classes.cardMain]: main,
    [classes.cardAdd]: add,
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
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  primary: PropTypes.bool,
  chart: PropTypes.bool,
  subscriptionLight: PropTypes.bool,
  subscription: PropTypes.bool,
  black: PropTypes.bool,
  main: PropTypes.bool,
  add: PropTypes.bool
};

export default withStyles(cardStyle)(Card);
