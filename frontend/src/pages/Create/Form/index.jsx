import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Snackbar from '../../../components/Snackbar';
import Form from '../../../lib/Form';
import formConfig from './form';

import Joyride from 'react-joyride';

var mixpanel = require('mixpanel-browser');
mixpanel.init('44b6b3d237fc93d6e6e371c900c53c55', { debug: true, verbose: 1 });

const CREATE_SQUAD = gql`
  mutation CreateSquad(
    $token: String!
    $service: String!
    $secret: String!
    $costPrice: Float!
    $description: String!
    $maxSize: Int
    $isPublic: Boolean!
    $image: String
  ) {
    createSquad(
      token: $token
      service: $service
      secret: $secret
      costPrice: $costPrice
      description: $description
      maxSize: $maxSize
      isPublic: $isPublic
      image: $image
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
    snackbarOpen: false,
    steps: [
      {
        target: '.first-step',
        content:
          'This form allows you to create your own subscription service, or a squad!',
        placement: 'top'
      },
      {
        target: '.second-step',
        content: 'Here you add the name of the service you want to share.',
        placement: 'bottom'
      },
      {
        target: '.third-step',
        content:
          'Then, tell us a bit about that service in a brief description.',
        placement: 'bottom'
      },
      {
        target: '.fourth-step',
        // TODO: Vahid needs to verify text
        content: 'Here you can add an optional image for your Squad',
        placement: 'bottom'
      },
      {
        target: '.fifth-step',
        content:
          'Secrets are encrypted messages that only squad members can access.',
        placement: 'bottom'
      },
      {
        target: '.fifth-step',
        content:
          'If you make this squad public, make sure usernames and passwords are randomly generated and not credentials you use on other sites.',
        placement: 'bottom'
      },
      {
        target: '.fifth-step',
        content:
          'When a squad member leaves, you may want to renew/refresh/regenerate secret information. You can do that in the manage squad page.',
        placement: 'bottom'
      },
      {
        target: '.sixth-step',
        content:
          'You can cap the maximum number of squad members or make the size unlimited.',
        placement: 'bottom'
      },
      {
        target: '.seventh-step',
        content:
          "Members join for access to your squad's secret information. Members are automatically billed each month and you receive payment (less any fees) at the end of the month.",
        placement: 'bottom'
      },
      {
        target: '.eighth-step',
        content:
          'A public squad shows up in search. If you want an invite only squad, keep it private.',
        placement: 'bottom'
      }
    ]
  };

  componentDidMount() {
    this.setState({ run: true });
    mixpanel.track('Squad Create Page Load');
  }

  onSubmit = async (createSquad, values) => {
    const variables = {
      token: window.localStorage.getItem('sessionToken'),
      service: values.service,
      secret: values.secret,
      costPrice: values.costPrice,
      description: values.description,
      isPublic: values.isPublic
    };
    if (values.image) variables.image = values.image;
    if (values.maxSize) variables.maxSize = values.maxSize;

    await createSquad({ variables });
    mixpanel.track('Squad Create', { squad: values.id });
    this.setState({ snackbarOpen: true });
  };

  callback = data => {
    // const { action, index, type } = data;
    mixpanel.track('Squad Create Tutorial Click');
  };

  render() {
    const { classes } = this.props;
    const { steps, run } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h5" gutterBottom>
            Create A Squad
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle1">
            Create your own subscription!
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
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 600);
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
                        {renderField('image', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12} className="fifth-step">
                        {renderField('secret', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12} className="sixth-step" sm={6}>
                        {renderField('maxSize', {
                          fullWidth: true
                        })}
                      </Grid>
                      <Grid item xs={12} className="seventh-step" sm={6}>
                        {renderField('costPrice', {
                          fullWidth: true
                        })}
                      </Grid>

                      <Grid item xs={12} className="eighth-step" sm={6}>
                        {renderField('isPublic')}
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
        {this.state.showSnackbar && <Snackbar message="You created a Squad!" />}
      </React.Fragment>
    );
  }
}

CreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateForm);
