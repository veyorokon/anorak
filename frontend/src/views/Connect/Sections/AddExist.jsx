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


class AddExist extends React.Component {
constructor(props){
    super(props);
    
}

  render() {
    const { classes, ref } = this.props;
    return (
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                <small>New or Existing?</small>
              </h3>
            </div>
                <NavPills
                  setValCallBack={this.props.setValCallBack}
                  color="primary"
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
    );
  }
}

export default withStyles(pillsStyle)(AddExist);