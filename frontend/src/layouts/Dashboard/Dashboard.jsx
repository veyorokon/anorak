/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/material-dashboard/Header/Header.jsx";
import Footer from "components/material-dashboard/Footer/Footer.jsx";
import Sidebar from "components/material-dashboard/Sidebar/Sidebar.jsx";
import { getAccountStatus, getAccountColor, getToken } from "lib/utility.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import { Query } from "react-apollo";
import { USER } from "lib/queries";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname && this.refs.mainPanel) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  switchRoutes = (dashboardRoutes) => {
    return(
      <Switch>
        {dashboardRoutes.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    );
}

updateRoutes = (routes, user) => {
  var newRoutes = routes;
  if (user.isMember){
    return routes;
  }
  else{
    return routes.filter(el => el.path !== "/dashboard/create");
  }
}

  render() {
    const { classes, ...rest } = this.props;
    return (
      <Query
        query={USER}
        variables={{ token: getToken() }}
        fetchPolicy="network-only"
      >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`; //redirect on error
        const user = data.user;
        var updatedRoutes = this.updateRoutes(dashboardRoutes, user);

        return (
        <div className={classes.wrapper}>
          <Sidebar
            routes={updatedRoutes}
            logoText={"Anorak"}
            logo={process.env.REACT_APP_STATIC_FILES+"images/logo-a.png"}
            image={null}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={updatedRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}

              <div className={classes.content}>
                <div className={classes.container}>{this.switchRoutes(updatedRoutes)}</div>
              </div>

            <Footer />
          </div>
        </div>
      );
      }}
    </Query>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
