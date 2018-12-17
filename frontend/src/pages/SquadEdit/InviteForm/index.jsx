import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Form from '../../../lib/Form';
import formConfig from './form';

const mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

const CREATE_INVITE = gql`
  mutation CreateInvite(
    $token: String!
    $squadID: Int!
    $invitedUserEmail: String!
  ) {
    createInvite(
      token: $token
      squadID: $squadID
      invitedUserEmail: $invitedUserEmail
    ) {
      squadMembership {
        id
        squad {
          id
          members {
            id
            status
            user {
              id
              email
            }
          }
        }
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    }
  },
  button: {
    marginTop: theme.spacing.unit * 3
  }
});

class InviteForm extends React.Component {
  onSubmit = async (createInvite, values) => {
    await createInvite({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadId,
        invitedUserEmail: values.email
      }
    });
    mixpanel.track('Squad Invite Create', {
      squad: this.props.squadID,
      invitedUserEmail: values.email
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6">Invite Someone</Typography>

        <Mutation mutation={CREATE_INVITE}>
          {createInvite => (
            <Form
              config={formConfig}
              onSubmit={async (values, { setSubmitting }) => {
                await this.onSubmit(createInvite, values);
                setTimeout(() => {
                  setSubmitting(false);
                }, 600);
              }}
            >
              {({ isSubmitting, renderField }) => (
                <div className="first-step">
                  <Grid container spacing={24}>
                    <Grid item xs={12} className="third-step">
                      {renderField('email', {
                        fullWidth: true
                      })}
                    </Grid>
                  </Grid>

                  <Button
                    className={classes.button}
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                  >
                    Invite
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Mutation>
      </Paper>
    );
  }
}

InviteForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InviteForm);
