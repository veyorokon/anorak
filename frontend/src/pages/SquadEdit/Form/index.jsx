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

const UPDATE_SQUAD = gql`
  mutation UpdateSquad(
    $token: String!
    $squadID: Int!
    $secret: String
    $description: String
  ) {
    updateSquad(
      token: $token
      secret: $secret
      description: $description
      squadID: $squadID
    ) {
      squad {
        id
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
  },
  subtitle: {
    marginBottom: 16
  }
});

class EditForm extends React.Component {
  onSubmit = async (updateSquad, values) => {
    await updateSquad({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        description: values.description,
        secret: values.secret,
        squadID: this.props.squadId
      }
    });
  };

  render() {
    const { classes } = this.props;
    formConfig.description.initialValue = this.props.description;
    formConfig.secret.initialValue = this.props.secret;
    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" gutterBottom>
          Edit A Squad
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Update <strong>{this.props.service}</strong>.
        </Typography>

        <Mutation mutation={UPDATE_SQUAD}>
          {updateSquad => (
            <Form
              config={formConfig}
              onSubmit={async (values, { setSubmitting }) => {
                await this.onSubmit(updateSquad, values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, renderField }) => (
                <div className="first-step">
                  <Grid container spacing={24}>
                    <Grid item xs={12} className="third-step">
                      {renderField('description', {
                        fullWidth: true
                      })}
                    </Grid>
                    <Grid item xs={12} className="fourth-step">
                      {renderField('secret', {
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
                    Update
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

EditForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditForm);
