import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '../../assets/icons/basic/dashboard';

function TitleCard(props) {
  return (
    <Paper className="body-title-card">
      <div class="card-content-wrapper">
        <div class="body-title-card-content">
          <div class="body-title-card-header">
            <Typography variant="h6" gutterBottom>
              Welcome To Your SquadUp Dashboard!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Create. Share. Subscribe.
            </Typography>
          </div>
          <div class="body-title-card-footer">
            <Typography variant="button" gutterBottom>
              Create a squad
            </Typography>
            <Typography variant="caption" gutterBottom>
              You currently have no new notifications.
            </Typography>
          </div>
        </div>
      </div>
      <div class="body-title-card-icon-wrapper">
        <div class="body-title-card-icon">
          <DashboardIcon />
        </div>
      </div>
    </Paper>
  );
}

export default TitleCard;
