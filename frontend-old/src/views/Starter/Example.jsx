import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import GridContainer from "components/material-dashboard/Grid/GridContainer.jsx";
import GridItem from "components/material-dashboard/Grid/GridItem.jsx";

import ExampleCard from "./Sections/ExampleCard";
import { Query } from "react-apollo";
import { USER } from "lib/queries";
import { getToken } from "lib/utility.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _ExampleContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //const { classes, user } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <ExampleCard />
        </GridItem>
      </GridContainer>
    );
  }
}

const ExampleContent = _ExampleContent;

function Example(props) {
  const { classes } = props;

  return (
    <Query query={USER} variables={{ token: getToken() }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return <ExampleContent user={data.user} classes={classes} />;
      }}
    </Query>
  );
}

_ExampleContent.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

Example.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(Example));
