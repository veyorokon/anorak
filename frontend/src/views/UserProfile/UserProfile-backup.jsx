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
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import { Elements, StripeProvider } from 'react-stripe-elements';
import { CardElement, injectStripe } from 'react-stripe-elements';
import {stripeAPIKey, getToken} from "lib/utility";
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {USER} from "lib/queries";
import {SET_STRIPE_CARD} from "lib/mutations";

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
const createOptions = () => {
  return {
    style: {
      base: {
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'inherit',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class _CardForm extends React.Component {
    onSubmit = async (setStripeCard, values) => {
      const { token } = await this.props.stripe.createToken({
        name: `john hamliet`,
        address_line1: "123 vill street",
        address_line2: "",
        address_city: "your mom",
        address_state: "CA",
        address_country: "USA"
      });
      // TODO: send stripe token as well
      const { data } = await setStripeCard({
        variables: {
          token: getToken(),
          cardToken: token.id
        }
      });
      // Add mixpanel here
     };
      
  render() {
    return (
        <Mutation mutation={SET_STRIPE_CARD}>
          {setStripeCard => (
              
      <form onSubmit={async (values) => {
        await this.onSubmit(setStripeCard, values);
      }}>
      <GridItem style={{border: "solid #000", borderWidth:" 0 1px", marginBottom:"15px"}} xs={12} sm={12} md={12}>
      <p>Would you like to update your card?</p>
          <CardElement {...createOptions()} />
         </GridItem>
         <Button style={{marginLeft: "-12px", marginBottom:"-12px"}} color="info" type="submit">Save Changes</Button>
      </form>
      )}
    </Mutation>
    )
  }
}
const CardForm = injectStripe(_CardForm);


class UserProfileContent extends React.Component {
    constructor(props){
        super(props)
        var user = this.props.user;
        this.state={
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            firstNameOnCard: '',
            lastNameOnCard: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: ''
        }
    }
    
    onChangeHandler = (event) => {
          var obj  = {}
          obj[event.target.id] = event.target.value;
          this.setState(obj);
    }
    test = () => {
        console.log(this.state)
    }
    
    render(){
      const { classes } = this.props;
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const email = this.state.email;
      return (
        <React.Fragment>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>User Profile</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={12}>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        onChange={this.onChangeHandler}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                            value: firstName
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={12}>
                      <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        onChange={this.onChangeHandler}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                            value: lastName
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true
                        }}
                        inputProps={{
                            value: email
                        }}
                      />
                    </GridItem>    
                    </GridContainer>              
                </CardBody>
                <CardFooter>
                  <Button onClick={this.test} color="info">Save</Button>
                </CardFooter>
              </Card>
            </GridItem>
                        
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Billing</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="First Name On Card"
                      id="firstNameOnCard"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Last Name On Card"
                      id="lastNameOnCard"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address Line 1"
                      id="line1"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address Line 2"
                      id="line2"
                      onChange={this.onChangeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        onChange={this.onChangeHandler}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomInput
                        labelText="State"
                        id="state"
                        onChange={this.onChangeHandler}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomInput
                        labelText="Country"
                        id="country"
                        onChange={this.onChangeHandler}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    
                  </GridContainer>
                </CardBody>
                <CardFooter>
                <GridItem xs={12} sm={12} md={12}>
                
                  <Elements>
                      <CardForm/>
                  </Elements>
                 
                </GridItem>    
                </CardFooter>
              </Card>
            </GridItem>
             </GridContainer>
        </React.Fragment>
      );
    }
}


function UserProfile(props) {
     const { classes } = props;
     return(
         <Query
           query={USER}
           variables={{ token: window.localStorage.getItem('sessionToken') }}
           fetchPolicy='no-cache'
         >
           {({ loading, error, data }) => {
             if (loading) return 'Loading...';
             if (error) return `Error! ${error.message}`;
             let memberships = [];
             return (
                 <StripeProvider apiKey={stripeAPIKey}>
                 <UserProfileContent user={data.user} classes={classes}/>
                </StripeProvider>
    
            )
        }}
        </Query>
     )
}
export default withStyles(styles)(UserProfile);
