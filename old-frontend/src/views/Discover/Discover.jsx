import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import { getToken } from "lib/utility.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {USER} from "lib/queries";
import {mixpanel} from "lib/utility.jsx";
import StackGrid from "react-stack-grid";

class Dashboard extends React.Component {
  render(){
    let images = [];
    const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92,643];
    for(let i = 0; i< imgId.length; i++){
    	const ih = 200 + Math.floor(Math.random()*10)*15;
    	images.push("https://unsplash.it/250/" + ih + "?image=" + imgId[i]);
    }
      return (
          <StackGrid
               columnWidth={250}
               gutterHeight={20}
               gutterWidth={20}
             >
				{images.map((image, id) => {
					return (
                        <div>
						<img src={image} />
                        </div>
					) 
				})}
			</StackGrid>
      )
  }
}



Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(dashboardStyle)(withRouter(Dashboard));
