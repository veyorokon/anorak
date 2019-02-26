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
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Button from "components/material-dashboard/CustomButtons/Button.jsx";

class AddLogin extends React.Component {
constructor(props){
    super(props);
    
}
 
  render() {
    const { classes, active, isGenerateDisabled, generatedPassword, setOwnPassword } = this.props;
    
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
              active={this.props.getActive}
              tabs={[
                {
                  tabButton: "Set",
                  tabIcon: AddBox,
                  tabContent: (
                    <span>
                      <p>
                        Type your own secure password.
                      </p>
                      
                        
                        <GridItem xs={6} sm={6} md={4} lg={8}>
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
                  disabled: isGenerateDisabled,
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
                                  placeHolder:generatedPassword,
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
              Passwords can be retrieved anytime from your dashboard.
            </p>
                    
            
          </div>
        </div>
    );
  }
}

export default withStyles(pillsStyle)(AddLogin);