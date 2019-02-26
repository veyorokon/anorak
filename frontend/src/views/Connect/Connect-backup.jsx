import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import Button from "components/material-dashboard/CustomButtons/Button.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardAvatar from "components/material-dashboard/Card/CardAvatar.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import { Elements, StripeProvider } from 'react-stripe-elements';

import avatar from "assets/img/faces/marc.jpg";
import { withRouter } from 'react-router-dom';

import AddBox from "@material-ui/icons/AddBox";
import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/Person";

import MergeType from "@material-ui/icons/MergeType";

import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import NavPillsModded from "components/material-dashboard/NavPills/NavPillsModded.jsx";

import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import {CopyToClipboard} from 'react-copy-to-clipboard';
import Confirmation from "./Sections/Confirmation.jsx";


// import gql from 'graphql-tag';
// 
// const CREATE_SUBSCRIPTION_ACCOUNT = gql`
// mutation SubscriptionAccountMutation(
//     $token:String!, 
//     $serviceKey:Int!, 
//     $planKey:Int!, 
//     $username:String!, 
//     $password:String!
// ) {
//     subscriptionAccount(
//         token:$token, 
//         serviceKey:$serviceKey, 
//         planKey:$planKey, 
//         password:$password, 
//         username:$username)
//         {
//       subscriptionAccount {
//         id
//         dateCreated
//         dateModified
//         statusAccount
//         service{
//           name
//         }
//       }
//     }
// }
// `;


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Connect extends React.Component {
constructor(props){
    super(props)
    this.state={
        isExisting:0,
        isGeneratedPassword:0,
        subscription:0,
        generatedPassword:this.generatePassword(),
        ownPassword:'',
        copied: false,
        isGenerateDisabled:false,
        planSelected: 0,
        activeStep: 0,
    }
}

setExistingStatus = (val) =>{
    if(val==1){
        this.setState({
            isExisting: val,
            isGenerateDisabled:true,
            isGeneratedPassword:0
        });
    }
    else{
        this.setState({
            isExisting: val,
            isGenerateDisabled:false,
        });
    }
}

setSubscription = (val) =>{
    this.setState({
        subscription: val,
        planSelected: 0
    });
}

setUsingGenerated = (val) =>{
    this.setState({
        isGeneratedPassword: val,
    });
}

setOwnPassword = (e) =>{
    this.setState({ownPassword:e.target.value})
}

setPlan = (val) => {
    this.setState({
        planSelected: val
    });
}

handleCopy=()=>{
    this.setState({copied: true});
}

generatePassword = () => {
    var length = 10,
        capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        charset = "abcdefghijklmnopqrstuvwxyz",
        numbers = "0123456789",
        symbols = "!$&#",
        retVal = "";
    for (var i = 0, n = capitals.length; i < 2; ++i) {
        retVal += capitals.charAt(Math.floor(Math.random() * n));
    }
    
    for (var i = 0, n = charset.length; i < 3; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    
    for (var i = 0, n = numbers.length; i < 2; ++i) {
        retVal += numbers.charAt(Math.floor(Math.random() * n));
    }
    for (var i = 0, n = symbols.length; i < 1; ++i) {
        retVal += symbols.charAt(Math.floor(Math.random() * n));
    }
    
    var a = retVal.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    return a.join("");
}

existingSection = (classes) => {
    return (
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                <small>New or Existing?</small>
              </h3>
            </div>
                <NavPills
                  setValCallBack={this.setExistingStatus}
                  color="success"
                  tabs={[
                    {
                      tabButton: "New",
                      tabIcon: AddBox,
                      tabContent: (
                        <span>
                          <p>
                            Subscribe to your favorite content by creating a new subscription account. 
                          </p>
                          
                        </span>
                      )
                    },
                    {
                      tabButton: "Existing",
                      tabIcon: MergeType,
                      tabContent: (
                        <span>
                          <p>
                            Already have an existing subscription account? Connect it to your dashboard. 
                          </p>
                          
                        </span>
                      )
                    },
                  ]}
                />
              
          </div>
        </div>
    )
}

loginSection = (classes, isGenDisabled, generatedPassword) => {
    return(
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                <small>Account Password:</small>
              </h3>
            </div>
            
            <NavPillsModded
              setValCallBack={this.setUsingGenerated}
              color="success"
              active={this.state.isGeneratedPassword}
              tabs={[
                {
                  tabButton: "Set",
                  tabIcon: AddBox,
                  tabContent: (
                    <span>
                      {(this.state.isExisting ? <p>
                        Enter the current password on the account.
                      </p> : <p>
                        Enter your own secure password.
                      </p>)}
                      
                        
                        <GridItem xs={6} sm={6} md={4} lg={8}>
                          <CustomInput
                            labelText="Password"
                            id="password"
                            type={"password"}
                            onChange={this.setOwnPassword}
                            formControlProps={{
                              fullWidth: true,
                            }}
                          />
                        </GridItem>
                      
                    </span>
                  )
                },
                {
                  tabButton: "Generate",
                  tabIcon: AddBox,
                  disabled: isGenDisabled,
                  tabContent: (
                    <span>
                      <p>
                        Let Anorak set a randomly generated password.
                      </p>
                      
                        <GridContainer style={{display: "flex", "align-items": "baseline", width:"100%"}}>
                          <GridItem xs={6} sm={6} md={4} lg={8}>
                            <CustomInput
                              labelText="Password"
                              id="password"
                              formControlProps={{
                                  disabled: true,
                                fullWidth: true,
                              }}
                              inputProps={{
                                  placeholder:generatedPassword,
                                  value: generatedPassword
                              }}
                            />
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                          <CopyToClipboard text={generatedPassword}
                          onCopy={this.handleCopy}>
                          <Button color="transparent">Copy</Button>
                        </CopyToClipboard>
                             
                          </GridItem>
                      </ GridContainer>
                      
                    </span>
                  )
                },
              ]}
            />
                    
            <p>
              Once set, passwords can be retrieved anytime from your dashboard.
            </p>
                    
            
          </div>
        </div>
    )
}

subscriptionSection = (classes) => {
    return(
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                <small>Subscription Service:</small>
              </h3>
            </div>
                <NavPills
                    setValCallBack={this.setSubscription}
                  color="success"
                  tabs={[
                    {
                      tabButton: "Netflix",
                      tabIcon: AddBox,
                      marginedTab: true,
                      tabContent: (
                        <span>
                          <p>
                            Netflix streaming service for videos and movies on demand.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "HBO",
                      tabIcon: AddBox,
                      marginedTab: true,
                      tabContent: (
                        <span>
                          <p>
                            HBO streaming service for videos and movies on demand.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Hulu",
                      tabIcon: AddBox,
                      marginedTab: true,
                      tabContent: (
                        <span>
                          <p>
                            Hulu streaming service for videos and movies on demand.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Spotify",
                      tabIcon: AddBox,
                      marginedTab: true,
                      tabContent: (
                        <span>
                          <p>
                            Spotify streaming service for music on demand.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              
          </div>
        </div>
    )
}

planSection = (classes) => {
    return(
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                <small>Choose Your Plan:</small>
              </h3>
            </div>
                <NavPillsModded
                    active={this.state.planSelected}
                    setValCallBack={this.setPlan}
                  color="success"
                  tabs={[
                    {
                      tabButton: "Individual",
                      tabIcon: AddBox,
                      marginedTab: true,
                      tabContent: (
                        <span>
                          <p>
                            Individual monthly plan for $14.00. Allows streaming for one session.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Group",
                      tabIcon: Person,
                      marginedTab: true,
                      tabContent: (
                        <span>
                            <p>
                              Group monthly plan for $18.00. Allows streaming for up to two simultaneous/concurrent sessions.
                            </p>
                        </span>
                      )
                    }
                  ]}
                />
              
          </div>
        </div>
    )
}

updateShowing = () => {
    var current = this.state.activeStep +1;
    current %= 2;
    this.setState({activeStep:current});
}

render(){
      const { classes } = this.props;
      var isGenDisabled = this.state.isGenerateDisabled;
      var generatedPassword = this.state.generatedPassword;
      var isShowingFirst = "none";
      var activeStep = this.state.activeStep;
      if(activeStep==0){
          isShowingFirst = "initial"
      }
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Card>
              <NavPillsModded
                  active={this.state.activeStep}
                  transparent
                setValCallBack={this.props.setValCallBack}
                color="transparent"
                tabs={[
                  {
                    tabContent: (
                        
                      <span style={{display:isShowingFirst}}>
                      <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Add A Subscription</h4>
                        <p className={classes.cardCategoryWhite}>Create a new or connect an existing account</p>
                      </CardHeader>
                      {this.existingSection(classes)}
                      
                      {this.subscriptionSection(classes)}
                      
                      {!this.state.isExisting && this.planSection(classes)}
                      
                      {this.loginSection(classes, isGenDisabled, generatedPassword)}
                          
                        
                      </span>
                    )
                  },
                  {
                    tabContent: (
                      <span>
                      <CardHeader >
                        <h4 >Review Your Subscription Account:</h4>
                        <p >Please confirm everything is correct.</p>
                      </CardHeader>
                      <CardBody>
                          <Confirmation />
                        </CardBody>                        
                      </span>
                    )
                  },
                ]}
              />
                            
                <CardFooter />
              </Card>
              {(activeStep ? 
                  <span>
                      <Button onClick={this.updateShowing} color="gray">
                        Back
                      </Button>
                      <Button onClick={this.updateShowing} color="success">
                        Confirm
                      </Button>
                  </span>
                  :  
                  <Button onClick={this.updateShowing} color="success">
                    Next
                  </Button> 
              )}
            </GridItem>
          </GridContainer>
        </div>
      );
  }
}

export default withStyles(pillsStyle)(Connect);
