import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import AddBox from "@material-ui/icons/AddBox";
import MergeType from "@material-ui/icons/MergeType";
import List from "@material-ui/icons/List";

// core components
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";
import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import CustomDropdown from "components/material-dashboard/CustomDropdown/CustomDropdown";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardAvatar from "components/material-dashboard/Card/CardAvatar.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";
import TextField from '@material-ui/core/TextField';

import Button from "components/material-dashboard/CustomButtons/Button.jsx";

class AddLogin extends React.Component {
constructor(props){
    super(props);
    this.refs.textAreaRef = React.createRef();
}

copyToClipboard = (e) => {
    this.refs.textAreaRef.select();
    document.execCommand('copy');
    e.target.focus();
  };
  
  render() {
    const { classes, ref, generatedPassword, setOwnPassword } = this.props;
    
    return (
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                <small>Account Password:</small>
              </h3>
            </div>
            <NavPills
              setValCallBack={this.props.setValCallBack}
              color="primary"
              tabs={[
                {
                  tabButton: "Set",
                  tabIcon: AddBox,
                  tabContent: (
                    <span>
                      <p>
                        Set your own secure password.
                      </p>
                      
                        
                        <GridItem xs={8} sm={8} md={4} lg={10}>
                          <CustomInput
                            labelText="Password"
                            id="password"
                            type={"password"}
                            onChange={setOwnPassword}
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
                  tabContent: (
                    <span>
                      <p>
                        Generate a secure random password.
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
                                  placeHolder:generatedPassword,
                                  value: generatedPassword
                              }}
                            />
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                             <Button onClick={this.copyToClipboard} color="transparent">Copy</Button>
                          </GridItem>
                      </ GridContainer>
                      
                          <TextField
                            style={{display:"none"}}
                            id="generatedValue"
                            label="Name"
                            value={generatedPassword}
                            margin="normal"
                            ref="textAreaRef"
                          />
                    </span>
                  )
                },
              ]}
            />
                    
                    
                    
            
          </div>
        </div>
    );
  }
}

export default withStyles(pillsStyle)(AddLogin);