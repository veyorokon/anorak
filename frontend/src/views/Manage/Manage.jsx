import React from "react";
import withSnackbar from 'components/material-dashboard/Form/withSnackbar';
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';
import {USER} from "lib/queries";
import {REQUEST_ACCOUNT_CANCELLATION, CONFIRM_SUBSCRIPTION_CONNECT} from "lib/mutations";

import { getToken, isAccountConfirmationNeeded } from "lib/utility.jsx";

import Overview from "./Sections/Overview";
import Connect from "./Sections/Connect";

import Button from "components/material-dashboard/CustomButtons/Button.jsx";

import AddBox from "@material-ui/icons/AddBox";
import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import Form from 'components/material-dashboard/Form/Form';
import {mixpanel} from "lib/utility.jsx";





class _ManageContent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            active: 0,
            cancelClicked: false,
            submitted: false,
            confirmClicked: false
        }
    }
    
    componentDidMount(){
        mixpanel.track('Manage Page Load', { subscription: this.getValue("service").name });
    }
    
    getValue = (key) => {
        const account = this.props.account;
        return account[key];
    }
    
    onSubmit = async (requestCancellation) => {
        var accountKey = this.props.account.id;
        var memberKey = this.props.membership.id;
        const variables = {
            token: getToken(),
            accountKey: accountKey,
            memberKey: memberKey,
        };
        await requestCancellation({ variables });
        this.setState({submitted: true});
        this.props.triggerSnackbar('Your cancellation request has been sent.');
    };
    
    confirmSubmit = async (confirmSubscriptionConnect) => {
        var accountKey = this.props.account.id;
        const variables = {
            token: getToken(),
            subscriptionAccountKey: accountKey,
        };
        await confirmSubscriptionConnect({ variables });
        this.setState({submitted: true});
        this.props.triggerSnackbar('You\'ve succesfully connected your account.');
    };
    
    renderConfirm = () =>{
        const {classes} = this.props;
        
        return(
            <div>
              <Card>
                  <div className={classes.container}>
                      <div className={classes.title}>
                        <h3>
                          <small id='confirmName'>Confirm Your {this.getValue("service").name} Account</small>
                        </h3>
                      </div>
                  <CardBody>
                      <Connect getValue={this.getValue}/>
                  </CardBody>
                  <CardFooter style={{margin:"auto",marginBottom:"15px"}}>
                  {(!this.state.cancelClicked ? (
                      <Button color="success" onClick={()=>this.setState({cancelClicked:true})} >
                        <span>Confirm</span>
                      </Button>
                  ):
                  (
                      <Mutation mutation={CONFIRM_SUBSCRIPTION_CONNECT}
                      refetchQueries={[
                        {
                          query: USER,
                          variables: {
                            token: getToken()
                          }
                        }
                      ]}>
                      {confirmSubscriptionConnect => (
                          <Form onSubmit={async (values, { setSubmitting }) => {
                            await this.confirmSubmit(confirmSubscriptionConnect);
                            setTimeout(() => {
                              setSubmitting(false);
                            }, 600);
                          }}>
                          
                  {({ isSubmitting }) => {
                  var text = 'Request Sent';
                  if(!this.state.submitted) text = "Connect Your Subscription?"
              return(<Button disabled={isSubmitting || this.state.submitted} color="primary" type="submit" >
                        <span>{text}</span>
                      </Button>
                  )
                      }}
                    </Form>
                      )}
                  </Mutation>
                  )
              )}
              </CardFooter>
               </div>
             </Card>
        </div>
        )
    }
    
    renderManage = () =>{
        const {classes} = this.props;
        
        return(
            <div>
            <NavPills
              active={this.state.activeStep}
              color="success"
              tabs={[
                  {
                    tabButton: "Manage",
                    tabIcon: AddBox,
                    marginedTab: true,
                    tabContent: (
                        <div>
                        <Card>
                            <div className={classes.container}>
                              <div id="navigation-pills">
                                <div className={classes.title}>
                                  <h3>
                                    <small>Overview</small>
                                  </h3>
                                </div>
                            <CardBody>
                                <Overview getValue={this.getValue}/>
                            </CardBody>
                            <CardFooter style={{margin:"auto",marginBottom:"15px"}}>
                            {(!this.state.cancelClicked ? (
                                <Button onClick={()=>this.setState({cancelClicked:true})} >
                                  <span>Cancel</span>
                                </Button>
                            ):
                            (
                                <Mutation mutation={REQUEST_ACCOUNT_CANCELLATION}
                                refetchQueries={[
                                  {
                                    query: USER,
                                    variables: {
                                      token: getToken()
                                    }
                                  }
                                ]}>
                                {requestCancellation => (
                                    <Form onSubmit={async (values, { setSubmitting }) => {
                                      await this.onSubmit(requestCancellation);
                                      setTimeout(() => {
                                        setSubmitting(false);
                                      }, 600);
                                    }}>
                                    
                            {({ isSubmitting }) => {
                            var text = 'Request Sent';
                            if(!this.state.submitted) text = "Are You Sure?"
                        return(<Button disabled={isSubmitting || this.state.submitted} color="danger" type="submit" >
                                  <span>{text}</span>
                                </Button>)
                                }}
                              </Form>
                                )}
                            </Mutation>
                            )
                        )}
                        </CardFooter>
                         </div>
                       </div>
                       </Card>
                       <div style={{marginBottom:"25px", color:"gray", fontSize:"small"}}>*Anorak charges a 3% + $0.50 fee for each managed subscription up to a maximum of $5.00 across all subscriptions. When this cap is reached, no additional fee will be assesed for managed subscriptions. Anorak reserves the right to amend the billing plan and will notify you at least one month in advance should any changes be made.</div>
                       </div>
                    )
                },
                {
                  tabButton: "Sharing",
                  tabIcon: AddBox,
                  marginedTab: true,
                  tabContent: (
                      <Card>
                          <div className={classes.container}>
                            <div id="sharing">
                              <div className={classes.title}>
                                <h3>
                                  <small>Your Neflix Account</small>
                                </h3>
                              </div>
                          <CardBody>
                              <Overview getValue={this.getValue}/>
                          </CardBody>
                          <CardFooter />
                       </div>
                     </div>
                     </Card>
                  )}
              ]}
              /></div>
        )
    }
    
    render(){
        const {classes} = this.props;
        var requiresConfirmation = isAccountConfirmationNeeded(this.getValue("statusAccount"));
         
        if(requiresConfirmation){
            return this.renderConfirm();
        }
        return this.renderManage();
    }
}

const ManageContent = withSnackbar(_ManageContent);

function getMembershipID(path){
    return path.substr(path.lastIndexOf('/') + 1)
}

function getMembership(path, data){
    const membershipID = getMembershipID(path)
    for (var i = 0; i < data.length; i++) {
        if(data[i].id == membershipID) return data[i];
    }
    return null;
}

function Manage(props) {
 const { classes } = props;

  return (
      <Query
        query={USER}
        variables={{ token: getToken() }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          const path = props.location.pathname;
          const subscriptionMemberships = data.user.subscriptionMemberships;
          const membership = getMembership(path, subscriptionMemberships);
          const account = membership.subscriptionAccount;
          return (
            <div>
                <ManageContent membership={membership} account={account} classes={classes} />
            </div>
        )
    }}
      </Query>
  );
}


export default withStyles(pillsStyle)(withRouter(Manage));
