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
import {formatDateTime, getRenewalDate, getAccountStatus, calcAnorakFee, isAccountConfirmationNeeded} from "lib/utility.jsx";

import { Mutation } from 'react-apollo';
import {CONFIRM_SUBSCRIPTION_CONNECT} from "lib/mutations";
import {USER} from "lib/queries";
import { getToken } from "lib/utility.jsx";
import Form from 'components/material-dashboard/Form/Form';


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
function getSum(n1, n2){
    return parseFloat(n1)+parseFloat(n2);
}

class Overview extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            cancelClicked: false,
            submitted: false
        }
    }
    
render(){
    
  const { classes, getValue } = this.props;
 
  return (
    <div>
          <GridContainer>
            <GridItem xs={6} sm={6} md={6}>
              <CustomInput
                labelText="Service"
                id="service"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  disabled: true,
                  value:getValue("service").name
                }}
              />
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Status"
              id="status"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value:getAccountStatus(getValue("statusAccount"))
              }}
            />
          </GridItem>
           </ GridContainer>
           
           <GridContainer>
            <GridItem xs={6} sm={6} md={6}>
                <CustomInput
                  labelText="Created"
                  id="created"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value:formatDateTime(getValue("dateCreated"))
                  }}
                />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Owner"
              id="owner"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value:getValue("responsibleUser").firstName
              }}
            />
          </GridItem>
          
           </GridContainer>
           
            <GridContainer>
            
            <GridItem xs={6} sm={6} md={6}>
              <CustomInput
                labelText="Price"
                id="price"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  disabled: true,
                  value:"$"+getValue("pricePlan").amount
                }}
              />
            </GridItem>
            
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Anorak Fee"
              id="fee"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value:"* $"+calcAnorakFee(getValue("pricePlan").amount)
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Total"
              id="total"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value:"$"+getSum(calcAnorakFee(getValue("pricePlan").amount), getValue("pricePlan").amount)
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
              <CustomInput
                labelText="Renews"
                id="renews"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  disabled: true,
                  value:getRenewalDate(getValue("statusAccount"))
                }}
              />
        </GridItem>
      </GridContainer>    
    </div>
  );
}
}

export default withStyles(styles)(Overview);
