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

const CREATE_SQUAD = gql`
  mutation CreateSquad(
    $token: String!
    $service: String!
    $secret: String!
    $costPrice: Float!
    $description: String!
    $maxSize: Int!
  ) {
    createSquad(
      token: $token
      service: $service
      secret: $secret
      costPrice: $costPrice
      description: $description
      maxSize: $maxSize
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
  },
  topForm: {
    marginBottom: 24
  }
});

class CreateForm extends React.Component {
  onSubmit = async (createSquad, values) => {
    const { data } = await createSquad({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        service: values.service,
        secret: values.secret,
        costPrice: values.costPrice,
        description: values.description,
        maxSize: values.maxSize
      }
    });
    console.log(data);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" gutterBottom>
          Create A Squad
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Create your own subscription service.
        </Typography>

        <Mutation mutation={CREATE_SQUAD}>
          {createSquad => (
            <Form
              config={formConfig}
              onSubmit={async (values, { setSubmitting }) => {
                await this.onSubmit(createSquad, values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, renderField }) => (
                <div>
                  <Typography variant="subtitle1">Squad Form</Typography>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      {renderField('service', {
                        fullWidth: true
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {renderField('description', {
                        fullWidth: true
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {renderField('secret', {
                        fullWidth: true
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderField('maxSize', {
                        fullWidth: true
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderField('costPrice', {
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
                    Create
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

CreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateForm);
