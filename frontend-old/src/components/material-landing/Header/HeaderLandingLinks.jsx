/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, PowerSettingsNew, ArrowForwardIos } from "@material-ui/icons";

// core components
import CustomDropdown from "components/material-landing/CustomDropdown/CustomDropdown.jsx";
import Button from "components/material-landing/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      
      <ListItem className={classes.listItem}>
        <Button
          href="#signup"
          color="transparent"
          className={classes.navLink}
        >
          <ArrowForwardIos className={classes.icons} /> SignUp
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Link to='/auth/login' className={classes.navLink}>
            <PowerSettingsNew className={classes.icons} /> Login
          </Link>
      </ListItem>
      
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
