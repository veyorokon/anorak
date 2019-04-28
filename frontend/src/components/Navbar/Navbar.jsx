import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Input from "components/Input/Input";
import Typography from "components/Typography/Typography";
import navbarStyle from "assets/jss/components/Navbar/navbarStyle";
import Button from "components/Button/Button";
import Hidden from "@material-ui/core/Hidden";
import MailIcon from "@material-ui/icons/Mail";

class PrimarySearchAppBar extends React.Component {
  render() {
    const { classes } = this.props;
    const inlineInputbuttonStyle = { flex: "1 1" };

    const mobileViewable = (
      <React.Fragment>
        <Hidden mdUp>
          <Toolbar className={classes.menuBar}>
            <Typography className={classes.title} variant="h2">
              iAnorak
            </Typography>
            <div className={classes.grow} />
            <Button
              icon={<MailIcon />}
              iconPosition="left"
              color="highlight"
              link
              size="md"
              className={classes.menuButton}
            >
              Login
            </Button>
            <Button
              icon={<MailIcon />}
              iconPosition="left"
              size="md"
              link
              className={classes.menuButton}
            >
              Signup
            </Button>
          </Toolbar>
        </Hidden>
      </React.Fragment>
    );

    const categories = (
      <React.Fragment>
        <Toolbar className={classes.categoryBar}>
          <Button secondary size="md" className={classes.categoryButton}>
            top
          </Button>
          <Button secondary size="md" className={classes.categoryButton}>
            men
          </Button>
          <Button secondary size="md" className={classes.categoryButton}>
            women
          </Button>
          <Button secondary size="md" className={classes.categoryButton}>
            novelty
          </Button>
        </Toolbar>
      </React.Fragment>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          {mobileViewable}
          <Toolbar>
            <Hidden smDown>
              <Typography className={classes.title} variant="h2">
                iAnorak
              </Typography>
            </Hidden>
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
            <Hidden smDown>
              <Button
                link
                icon={<MailIcon />}
                iconPosition="left"
                color="highlight"
                size="md"
                style={{ marginLeft: "5rem" }}
              >
                Login
              </Button>
              <Button link icon={<MailIcon />} iconPosition="left" size="md">
                Signup
              </Button>
            </Hidden>
          </Toolbar>
          {categories}
        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(navbarStyle)(PrimarySearchAppBar);
