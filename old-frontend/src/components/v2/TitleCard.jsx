import React from 'react';
import Paper from '@material-ui/core/Paper';

function TitleCard(props) {
  return (
    <Paper className="body-title-card">
      <div class="card-content-wrapper">
        <div class="body-title-card-content">
          <div class="body-title-card-header">
            <div class="card-text-h1 vertical-flex title-card-flex">
              {props.title}
            </div>
            <div class="card-text-subtitle vertical-flex">{props.subTitle}</div>
          </div>
          <div class="body-title-card-footer">
            <div class="card-text-link vertical-flex text-link">
              {props.action}
            </div>
            <div class="card-text-caption vertical-flex">
              {props.notifications}
            </div>
          </div>
        </div>
      </div>
      <div class="body-title-card-icon-wrapper">
        <div class="body-title-card-icon">{props.icon}</div>
      </div>
    </Paper>
  );
}

export default TitleCard;
