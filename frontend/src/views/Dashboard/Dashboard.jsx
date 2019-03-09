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
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/material-dashboard/Card/CardIcon.jsx";
import Success from "components/material-dashboard/Typography/Success.jsx";
import Typography from "components/material-dashboard/Typography/Typography.jsx"
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import CardModal from "components/material-dashboard/CardModal/CardModal";
import { getMemberStatus, getMemberColor, getToken } from "lib/utility";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {USER} from "lib/queries";
import {mixpanel} from "lib/utility";


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
  
  componentDidMount(){
      mixpanel.track('Dashboard Page Load');
  }
  render() {
    const { classes } = this.props;
    return getToken() ? (
      <Query
        query={USER}
        variables={{ token: getToken()}}
        fetchPolicy='network-only'
      >
      
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`; //redirect on error
          let memberships = [];
          data.user.subscriptionMemberships.forEach(elem => {
              memberships.push(elem);
          });
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
            <h4 className={classes.cardTitle}>Welcome, {data.user.firstName}
            </h4>
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
            <Button action round aria-label="Add" onClick={()=>{this.props.history.push('/dashboard/connect');}}>
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
      
        {memberships.map(({id, statusMembership, subscriptionAccount}) => {
            var color = getMemberColor(statusMembership);
          return(<GridItem key={id} xs={12} sm={6} md={6} lg={6}>
            <Card subscription>
            <CardHeader>
            <CardIcon className={classes.subscriptionCardIcon} color={color}>
            </CardIcon>
            <span className={classes.cardInLine}>
                
                <h5
                 ><Typography color={color}>{getMemberStatus(statusMembership)}</Typography></h5> 
                               
                <h5 className={classes.cardCategoryWhite}>
                    ${subscriptionAccount.pricePlan.amount}
                </h5>
            </span>
            </CardHeader>
              <CardBody subscription>
               <img src={require("assets/svg/"+subscriptionAccount.service.name.toLowerCase()+".svg")} className={classes.cardImage} />
              </CardBody>
              <CardFooter>
              <span className={classes.cardInLine}>
               
               <CardModal membershipID={id} title={"Account Login"}/>
               <Button onClick={()=>{this.props.history.push('manage/'+id);}} color="transparent" >
                 <span className={classes.cardCategoryWhite}>Manage</span>
               </Button>
               </span>      
              </CardFooter>
            </Card>
          </GridItem>)
      }
        )}
        
      </GridContainer>
      </div>
          );
        }}
        </Query>
        ) : (
        <div />
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(Dashboard));
