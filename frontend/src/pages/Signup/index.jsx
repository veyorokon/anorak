import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FacebookLogin from './FacebookLogin';
import Header from './Header';
import SignupForm from './SignupForm';

import track from 'react-tracking';

import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';
const TRIGGER_EVENT = gql`
  mutation TriggerEvent($event: String!, $page: String!, $module: String!) {
    triggerEvent(event: $event, page: $page, module: $module) {
      trigger {
        id
      }
    }
  }
`;

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  overline: {
    marginTop: '28px'
  }
});

class TriggerEvent extends React.Component {
  componentDidMount() {
    const data = this.props.data;
    this.props.event({
      variables: {
        event: data.event,
        page: data.page,
        module: data.module
      }
    });
  }
  render() {
    return null;
  }
}

class Signup extends React.Component {
  render() {
    return (
      <Mutation mutation={TRIGGER_EVENT}>
        {triggerEvent => {
          return (
            <React.Fragment>
              <TriggerEvent
                data={this.props.tracking.getTrackingData()}
                event={triggerEvent}
              />
              <main className={this.props.classes.layout}>
                <Paper className={this.props.classes.paper}>
                  <Header />
                  <FacebookLogin />

                  <Typography
                    variant="overline"
                    className={this.props.classes.overline}
                  >
                    Or
                  </Typography>
                  <SignupForm />
                </Paper>
              </main>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default track({
  page: 'SignUp Page',
  event: 'View',
  module: 'SignUp Page'
})(withStyles(styles)(Signup));
