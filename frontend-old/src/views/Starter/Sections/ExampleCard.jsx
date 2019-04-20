import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules
import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";

// Queries and Mutations

// import { Query } from "react-apollo";
// import { USER } from "lib/queries";
// import { getToken } from "lib/utility.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _ExampleCardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="success" icon>
          <h3 className={classes.cardTitle}>ExampleCard</h3>
        </CardHeader>
        <CardBody>
          <h3>
            <small>Members</small>
          </h3>
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

const ExampleCardContent = _ExampleCardContent;

// function ExampleCardQueryWrapper(props) {
//   const { classes } = props;
//   return (
//     <Query query={EXAMPLE_QUERY} variables={{ token: getToken() }}>
//       {({ loading, error, data }) => {
//         if (loading) return "Loading...";
//         if (error) return `Error! ${error.message}`;
//         console.log(data.user);
//         return <ExampleCardContent user={data.user} classes={classes} />;
//       }}
//     </Query>
//   );
// }

function ExampleCard(props) {
  return <ExampleCardContent {...props} />;
}

_ExampleCardContent.propTypes = {
  classes: PropTypes.object.isRequired
};

ExampleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(ExampleCard));
