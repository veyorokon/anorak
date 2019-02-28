import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

function Info({ ...props }) {
  const { color, classes, children } = props;
  if(color=="info"){
      return (
        <div className={classes.defaultFontStyle + " " + classes.infoText}>
                  {children}
        </div>
      );
  }
  if(color=="primary"){
      return (
        <div className={classes.defaultFontStyle + " " + classes.primaryText}>
                  {children}
        </div>
      );
  }
  if(color=="warning"){
      return (
        <div className={classes.defaultFontStyle + " " + classes.warningText}>
                  {children}
        </div>
      );
  }
  if(color=="success"){
      return (
        <div className={classes.defaultFontStyle + " " + classes.successText}>
                  {children}
        </div>
      );
  }
  return (
    <div className={classes.defaultFontStyle}>
      {children}
    </div>
  );
}

Info.propTypes = {
  color: PropTypes.string.isRequired
};

export default withStyles(typographyStyle)(Info);
