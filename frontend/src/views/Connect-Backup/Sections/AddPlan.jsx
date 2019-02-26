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
    this.state = {
    copied: false,
  };
}

handleCopy=()=>{
    this.setState({copied: true});
}
  
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
            
                    
            
                    
            
          </div>
        </div>
    );
  }
}

export default withStyles(pillsStyle)(AddLogin);