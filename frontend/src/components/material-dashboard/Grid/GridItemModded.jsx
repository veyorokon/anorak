import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

function GridItem({ ...props }) {
  const { classes, children, hideFirst, ...rest } = props;
  return (
      {(hideFirst ? 
          <Grid item {...rest} className={classes.grid}>
            {children}
          </Grid>
          : <Grid item {...rest} className={classes.grid}>
            {children}
          </Grid>)
    )}
    
  );
}

export default withStyles(style)(GridItem);
