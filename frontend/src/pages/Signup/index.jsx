import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FacebookButton from '../../components/FacebookButton';
import SignupForm from './Form';
import Header from './Header';

const mixpanel = require('mixpanel-browser');

mixpanel.init('3800b7f2e3b6602f2bd7ee5c6e5dac42', { debug: true, verbose: 1 });

const styles = theme => {
  const layoutWidth = 400;
  const layoutSideMargin = theme.spacing.unit * 3;
  return {
    layout: {
      width: layoutWidth,
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down(layoutWidth + layoutSideMargin * 2)]: {
        width: 'auto',
        marginLeft: layoutSideMargin,
        marginRight: layoutSideMargin
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      [theme.breakpoints.down(layoutWidth + layoutSideMargin * 2)]: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    overline: {
      marginTop: '28px'
    }
  };
};

class Signup extends React.Component {
  static propTypes = {
    mixpanel: PropTypes.object.isRequired
  };

  componentDidMount() {
    mixpanel.track('Signup Page Load');
  }

  render() {
    return (
      <main className={this.props.classes.layout}>
        <Paper className={this.props.classes.paper}>
          <Header />
          <FacebookButton text="Signup via Facebook" />
          <Typography
            variant="overline"
            className={this.props.classes.overline}
          >
            Or
          </Typography>
          <SignupForm />
        </Paper>
      </main>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
