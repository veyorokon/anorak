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

class SubSelection extends React.Component {
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
                <small>Subscription Service:</small>
              </h3>
            </div>
                <NavPills
                    setValCallBack={this.props.setValCallBack}
                  color="primary"
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
    );
  }
}

export default withStyles(pillsStyle)(SubSelection);