import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Input from "components/Input/Input";
import Typography from "components/Typography/Typography";
import navbarStyle from "assets/jss/components/Navbar/navbarStyle";
import Button from "components/Button/Button";

class PrimarySearchAppBar extends React.Component {
  render() {
    const { classes } = this.props;
    const inlineInputbuttonStyle = { flex: "1 1" };
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.title} variant="h2">
              iAnorak
            </Typography>
            <Input
              search
              formControlProps={{
                style: inlineInputbuttonStyle
              }}
              inputprops={{
                placeholder: "Search",
                inputprops: {
                  "aria-label": "Search"
                }
              }}
            />
            <div className={classes.sectionDesktop}>
              <Button link size="sm">
                Login
              </Button>
              <Button link size="sm">
                Signup
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <Button link size="sm">
                Login
              </Button>
              <Button link size="sm">
                Signup
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(navbarStyle)(PrimarySearchAppBar);
