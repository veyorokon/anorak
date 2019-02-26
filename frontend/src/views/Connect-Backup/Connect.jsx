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
import Hidden from "@material-ui/core/Hidden";

import AddExist from "./Sections/AddExist"
import SubSelection from "./Sections/SubSelection"
import AddLogin from "./Sections/AddLogin"

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
        isGeneratedPassword:0,
        isExisting:0,
        subscription:0,
        generatedPassword:this.generatePassword(),
        ownPassword:'',
        active: 0,
        copied: false
    }
}
setExistingStatus = (val) =>{
    this.setState({
        isExisting: val,
        active: 0
    });
}
setUsingGenerated = (val) =>{
    this.setState({
        isGeneratedPassword: val,
        active: 1
    });
}
setSubscription = (val) =>{
    this.setState({
        subscription: val
    });
}


setOwnPassword = (e) =>{
    this.setState({ownPassword:e.target.value})
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


render(){
      const { classes } = this.props;
      return (
            
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add A Subscription</h4>
                <p className={classes.cardCategoryWhite}>Create a new or connect an existing account</p>
              </CardHeader>
              
                <AddExist setValCallBack={this.setExistingStatus} />
                <SubSelection alignCenter setValCallBack={this.setSubscription} />
                
                <AddLogin alignCenter 
                setValCallBack={this.setUsingGenerated} setOwnPassword={this.setOwnPassword} 
                generatedPassword ={this.state.generatedPassword}
                isGenerateDisabled={this.state.isExisting}
                getActive={this.state.active}
                />
                
                
                
                <CardFooter />
              </Card>
              <Button onClick={()=>{console.log(this.state)}} color="primary">Review</Button>
            </GridItem>
          </GridContainer>
        </div>
      );
  }
}

export default withStyles(styles)(Connect);
