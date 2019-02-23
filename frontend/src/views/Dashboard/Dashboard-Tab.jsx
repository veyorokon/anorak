import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import CardActions from '@material-ui/core/CardActions';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import DashboardIcon from "assets/svg/dashboardVector";
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/material-dashboard/Card/CardIcon.jsx";

import BugReport from "@material-ui/icons/BugReport";
import Cloud from "@material-ui/icons/Cloud";
import Tasks from "components/material-dashboard/Tasks/Tasks.jsx";
import CustomTabs from "components/material-dashboard/CustomTabs/CustomTabs.jsx";
import { bugs, website, server } from "variables/general.jsx";
import Code from "@material-ui/icons/Code";


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
        <CardHeader color="success" stats icon>
          <CardIcon color="success">
            <Icon>content_copy</Icon>
          </CardIcon>
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Welcome, Vahid</h4>
            <p className={classes.cardCategory}>
                Manage all your subscriptions in one place.
            </p>
          </CardBody>
          
        </Card>
      </GridItem>
      
      <GridItem xs={12} sm={6} md={6} lg={6}>
      
        <Card add>
          <CardHeader>
          <CustomTabs
            title=""
            headerColor="primary"
            tabs={[
              {
                tabName: "Create",
                tabIcon: BugReport,
                tabContent: (
                    <CardBody add>
                      <p className={classes.cardCategory}>
                      <Button action round aria-label="Add">
                          <AddIcon className={classes.extendedIcon} />
                          Add
                        </Button>
                      </p>
                    </CardBody>
                )
              },
              {
                tabName: "Add",
                tabIcon: Code,
                tabContent: (
                    <CardBody add>
                      <p className={classes.cardCategory}>
                      <Button action round aria-label="Add">
                          <AddIcon className={classes.extendedIcon} />
                          Addt
                        </Button>
                      </p>
                    </CardBody>
                )
              },
              
            ]}
          />
          </CardHeader>
          
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
            <Icon></Icon>
          </CardIcon>
          <span className={classes.cardInLine}>
              <h5 className={classes.subscriptionHeader}>Active</h5>                
              <h5 className={classes.cardCategoryWhite}>
                  $12.99
              </h5>
          </span>
          </CardHeader>
            <CardBody subscription>
             <img src="https://cdn.freebiesupply.com/logos/large/2x/netflix-2-logo-png-transparent.png" className={classes.cardImage} />
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
