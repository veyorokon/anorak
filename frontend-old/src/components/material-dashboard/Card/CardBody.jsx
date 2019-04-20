import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardBodyStyle from "assets/jss/material-dashboard-react/components/cardBodyStyle.jsx";

function CardBody({ ...props }) {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    subscription,
    add,
    ...rest
  } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [classes.cardBodySubscription]: subscription,
    [classes.cardBodyAdd]: add,
    [className]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  add: PropTypes.bool,
  subscription: PropTypes.bool
};

export default withStyles(cardBodyStyle)(CardBody);
