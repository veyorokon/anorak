import React from 'react';
import Paper from '@material-ui/core/Paper';
import DashboardIcon from '../../assets/icons/basic/dashboard';

function TitleCard(props) {
  return (
    <Paper className="body-title-card">
      <div class="card-content-wrapper">
        <div class="body-title-card-content">
          <div class="body-title-card-header">
            <div class="card-text-h1 vertical-flex title-card-flex">
              Welcome To Your SquadUp Dashboard!
            </div>
            <div class="card-text-subtitle vertical-flex">
              Create. Share. Subscribe.
            </div>
          </div>
          <div class="body-title-card-footer">
            <div class="card-text-link vertical-flex text-link">
              Create a squad
            </div>
            <div class="card-text-caption vertical-flex">
              You currently have no new notifications.
            </div>
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
