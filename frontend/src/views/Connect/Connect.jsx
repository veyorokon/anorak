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
        ownPassword:''
    }
}
setExistingStatus = (val) =>{
    this.setState({
        isExisting: val
    });
}
setUsingGenerated = (val) =>{
    this.setState({
        isGeneratedPassword: val
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

generatePassword = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$&",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
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
                generatedPassword ={this.state.generatedPassword}/>
                
                                 
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
