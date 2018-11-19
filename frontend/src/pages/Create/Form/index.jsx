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

import Joyride from 'react-joyride';

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
  state = {
    run: false,
    steps: [
      {
        target: '.first-step',
        content: 'This form allows you to create a squad!',
        placement: 'top',
        event: 'hover'
      },
      {
        target: '.second-step',
        content: 'Here you add the name of the service you want to share.',
        placement: 'bottom'
      },
      {
        target: '.third-step',
        content:
          'Then, tell us a bit about that service in one or two sentences. If you make this squad public, this is how other users can search for your squad so be descriptive.',
        placement: 'bottom'
      },
      {
        target: '.fourth-step',
        content:
          'Secrets are encrypted messages that only squad members can access.',
        placement: 'bottom'
      },
      {
        target: '.fourth-step',
        content:
          'If you make this squad public, make sure usernames and passwords are randomly generated and not credentials you use on other sites.',
        placement: 'bottom'
      },
      {
        target: '.fourth-step',
        content:
          'When a squad member leaves, you may want to renew/refresh/regenerate this information.',
        placement: 'bottom'
      },
      {
        target: '.fifth-step',
        content:
          'Lastly, set the maximum size of squad members you want and the price for your squad.',
        placement: 'bottom'
      }
    ]
  };

  componentDidMount() {
    this.setState({ run: true });
  }

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

  callback = data => {
    const { action, index, type } = data;
  };

  render() {
    const { classes } = this.props;
    const { steps, run } = this.state;
    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" gutterBottom>
          Create A Squad
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Create your own squad.
        </Typography>

        <Joyride
          steps={steps}
          run={run}
          callback={this.callback}
          continuous={true}
        />

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
                <div className="first-step">
                  <Typography variant="subtitle1">Squad Form</Typography>
                  <Grid container spacing={24}>
                    <Grid item xs={12} className="second-step">
                      {renderField('service', {
                        fullWidth: true
                      })}
                    </Grid>
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
                    <Grid item xs={12} className="fifth-step" sm={6}>
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
