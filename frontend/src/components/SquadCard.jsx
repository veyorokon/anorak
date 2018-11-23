import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import SquadCardModal from './SquadCardModal';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_SECRET = gql`
  query GetSecret($token: String!, $membershipID: Int!) {
    getSecret(token: $token, membershipID: $membershipID)
  }
`;

const styles = {
  cost: {
    marginBottom: 10
  }
};

class SquadCard extends React.Component {
  getSecret = membershipID => {
    return (
      <Query
        query={GET_SECRET}
        variables={{
          token: window.localStorage.getItem('sessionToken'),
          membershipID
        }}
      >
        {({ error, data, loading }) => (
          <SquadCardModal
            title={this.props.service}
            membershipID={this.props.membershipID}
            secret={!(error || loading) ? data.getSecret : 'unknown'}
          />
        )}
      </Query>
    );
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.service}
          </Typography>
          <Typography className={this.props.classes.cost} color="textSecondary">
            ${(this.props.price / 100).toFixed(2)} / month
          </Typography>
          <Typography component="p">{this.props.description}</Typography>
        </CardContent>
        <CardActions>{this.getSecret(this.props.membershipID)}</CardActions>
      </Card>
    );
  }
}

SquadCard.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  service: PropTypes.string.isRequired
};

export default withStyles(styles)(SquadCard);
