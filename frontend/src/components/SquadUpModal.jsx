import React from 'react';
import PropTypes from 'prop-types';
import { withMobileDialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Grid from '@material-ui/core/Grid';

import { GET_USER } from './SquadList';
import { SEARCH_SQUADS } from '../pages/Dashboard/SquadSearch';

const CREATE_MEMBERSHIP = gql`
  mutation CreateMembership($token: String!, $squadID: Int!) {
    createMembership(token: $token, squadID: $squadID) {
      squadMembership {
        id
        status
      }
    }
  }
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#231C07 !important'
    }
  },
  white: {
    color: 'white'
  }
});

class SquadUpModal extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = async client => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onAcceptClick = async createMembership => {
    await createMembership({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        squadID: this.props.squadID
      }
    });
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          <Typography className={classes.white} noWrap>
            Squad
          </Typography>
          <Typography color="secondary" noWrap>
            Up
          </Typography>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {this.props.service}
            <Typography
              style={{ justifyContent: 'flex-end' }}
              color="textSecondary"
            >
              {this.props.owner}
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12} style={{ display: 'block' }}>
                <Typography>{this.props.description}</Typography>
              </Grid>
              <Grid item xs={6} color="textSecondary">
                <Typography>Cost:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">
                  ${(this.props.price / 100).toFixed(2)} / month
                </Typography>
              </Grid>
              <Grid item xs={6} color="textSecondary">
                <Typography>Billed:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.cost} color="textSecondary">
                  Monthly
                </Typography>
              </Grid>
              <Grid item xs={6} color="textSecondary">
                <Typography>Size:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.cost} color="textSecondary">
                  {this.props.size}
                </Typography>
              </Grid>
              <Grid item xs={6} color="textSecondary">
                <Typography>Capacity:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.cost} color="textSecondary">
                  {this.props.capacity}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <Mutation
                  mutation={CREATE_MEMBERSHIP}
                  refetchQueries={[
                    {
                      query: GET_USER,
                      variables: {
                        token: window.localStorage.getItem('sessionToken')
                      }
                    },
                    {
                      query: SEARCH_SQUADS,
                      variables: {
                        text: '',
                        token: window.localStorage.getItem('sessionToken')
                      }
                    }
                  ]}
                >
                  {createMembership => (
                    <Button
                      onClick={() => this.onAcceptClick(createMembership)}
                      color="secondary"
                    >
                      SquadUp
                    </Button>
                  )}
                </Mutation>
              </Grid>
              <Grid item xs={6} color="textSecondary">
                <Button onClick={this.handleClose} color="primary">
                  cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SquadUpModal.propTypes = {
  classes: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  service: PropTypes.string.isRequired,
  squadID: PropTypes.string.isRequired
};

export default withMobileDialog()(withStyles(styles)(SquadUpModal));
