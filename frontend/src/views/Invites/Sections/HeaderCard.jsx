import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// Custom modules

import Card from "components/material-dashboard/Card/Card.jsx";
import CardHeader from "components/material-dashboard/Card/CardHeader.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import CardFooter from "components/material-dashboard/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class _HeaderCardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="success" icon>
          <h3 className={classes.cardTitle}>HeaderCard</h3>
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

const HeaderCardContent = _HeaderCardContent;

function HeaderCard(props) {
  return <HeaderCardContent {...props} />;
}

_HeaderCardContent.propTypes = {
  classes: PropTypes.object.isRequired
};

HeaderCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(withRouter(HeaderCard));
