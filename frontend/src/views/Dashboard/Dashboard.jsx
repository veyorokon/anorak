import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardActions from '@material-ui/core/CardActions';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import DashboardIcon from "assets/svg/dashboardVector";
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={6} lg={6}>
      
        <Card main>
        <CardHeader stats color="success" icon>
          <CardIcon color="primary">
            <Icon>assessment</Icon>
          </CardIcon>
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Welcome, Vahid</h4>
            <p className={classes.cardCategory}>
                Manage all your subscriptions in one simple interface. Cancel and subscribe at the click of a button.
            </p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              You have no new notifications.
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      
      <GridItem xs={12} sm={6} md={6} lg={6}>
        <Card add>
          <CardHeader add>
              <h4 className={classes.cardTitle}>Add A Subscription</h4>
              <p className={classes.cardCategory}>
                  Add your subscription accounts to completely manage them from your dashboard.
              </p>
          </CardHeader>
          <CardBody add>
            <p className={classes.cardCategory}>
            <Button action round aria-label="Add">
                <AddIcon className={classes.extendedIcon} />
                Add
              </Button>
            </p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              By connecting an account, you agree to our &nbsp;
              <a className={classes.textLink}>Terms of Service</a>.
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <Card subscription>
          <CardHeader subscription>
          <CardIcon className={classes.subscriptionCardIcon} color="success">
          </CardIcon>
          <span className={classes.cardInLine}>
              <h5 className={classes.subscriptionHeader}>Active</h5>                
              <h5 className={classes.cardCategoryWhite}>
                  $12.99
              </h5>
          </span>
          </CardHeader>
            <CardBody subscription>
             <img src={require("assets/svg/spotify.svg")} className={classes.cardImage} />
            </CardBody>
            <CardFooter>
            <span className={classes.cardInLine}>
             
             <Button size="md" color="transparent" >
               <span className={classes.cardCategoryWhite}>Account</span>
             </Button>
             <Button size="md" color="transparent" >
               <span className={classes.cardCategoryWhite}>Manage</span>
             </Button>
             </span>      
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <Card subscription>
          <CardHeader subscription>
          <CardIcon className={classes.subscriptionCardIcon} color="warning">
          </CardIcon>
          <span className={classes.cardInLine}>
              <h5 className={classes.subscriptionHeader}>Attention</h5>                
              <h5 className={classes.cardCategoryWhite}>
                  $12.99
              </h5>
          </span>
          </CardHeader>
            <CardBody subscription>
             <img src={require("assets/svg/hbo.svg")} className={classes.cardImage} />
            </CardBody>
            <CardFooter>
            <span className={classes.cardInLine}>
             
             <Button size="md" color="transparent" >
               <span className={classes.cardCategoryWhite}>Account</span>
             </Button>
             <Button size="md" color="transparent" >
               <span className={classes.cardCategoryWhite}>Manage</span>
             </Button>
             </span>      
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <Card subscription>
          <CardHeader subscription>
          <CardIcon className={classes.subscriptionCardIcon} color="success">
          </CardIcon>
          <span className={classes.cardInLine}>
              <h5 className={classes.subscriptionHeader}>Active</h5>                
              <h5 className={classes.cardCategoryWhite}>
                  $12.99
              </h5>
          </span>
          </CardHeader>
            <CardBody subscription>
             <img src={require("assets/svg/netflix.svg")} className={classes.cardImage} />
            </CardBody>
            <CardFooter>
            <span className={classes.cardInLine}>
             
             <Button size="md" color="transparent" >
               <span className={classes.cardCategoryWhite}>Account</span>
             </Button>
             <Button size="md" color="transparent" >
               <span className={classes.cardCategoryWhite}>Manage</span>
             </Button>
             </span>      
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
