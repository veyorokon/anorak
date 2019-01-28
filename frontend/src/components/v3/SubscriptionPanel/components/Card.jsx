import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ShareButton from './ShareButton';
import { withStyles } from '@material-ui/core/styles';

import { ReactComponent as Netflix } from '../../../../assets/icons/logos/netflix.svg';

import './style.css';
const styles = theme => ({
  cardTop: {
    padding: theme.spacing.unit * 2,
    background: 'rgba(255, 255, 255, 0.03)'
  }
});
//theme.spacing.unit * 2
class SubscriptionCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="Card">
        <div className={classes.cardTop}>
          <div className="Card-Header">
            <div className="Card-Header-Bar">
              <div className="Card-Status">Subscribed</div>
              <div className="Card-Menu-Dots" />
            </div>
          </div>

          <div className="Card-Image">
            <Netflix />
          </div>
        </div>

        <div
          className="Padded Card-Section Card-Bottom"
          style={{ '--padding': '4%' }}
        >
          <div className="Card-Service">
            <div className="Card-Service-Header">
              <div className="Card-Service-Name">Netflix</div>
              <div className="Card-Service-Price">$2.75</div>
            </div>

            <div className="Card-Service-Description">
              Movie streaming service.
            </div>
          </div>
        </div>

        <div className="Card-Actions Padded" style={{ '--padding': '4%' }}>
          <ShareButton />
          <Button
            variant="contained"
            color="primary"
            className="Card-Account-Button"
          >
            Account
          </Button>
        </div>
      </div>
    );
  }
}

SubscriptionCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SubscriptionCard);
