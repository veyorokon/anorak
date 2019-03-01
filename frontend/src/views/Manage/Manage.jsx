import React from "react";
import withSnackbar from 'components/material-dashboard/Form/withSnackbar';
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';

import {USER} from "lib/queries";

import { getToken } from "lib/utility";



class _ManageContent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    
    render(){
        return(
            <div>hi</div>
        )
    }
}

const ManageContent = withSnackbar(_ManageContent);

function getMembershipID(path){
    return path.substr(path.lastIndexOf('/') + 1)
}

function getMembership(path, data){
    console.log(data);
    const membershipID = getMembershipID(path)
    return path.substr(path.lastIndexOf('/') + 1)
}

function Manage(props) {
 const { classes } = props;

  return (
      <Query
        query={USER}
        variables={{ token: getToken() }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          const path = props.location.pathname;
          const subscriptionMemberships = data.user.subscriptionMemberships;
          const membershipID = getMembership(path, subscriptionMemberships)
          console.log(membershipID)
          return (
            <div>
                <ManageContent classes={classes} />
            </div>
        )
    }}
      </Query>
  );
}


export default withStyles(pillsStyle)(withRouter(Manage));
