import React from 'react';
import Paper from '@material-ui/core/Paper';
import Lock from '../../assets/icons/basic/lock';

function ContentCard(props) {
  return (
    <Paper className="body-content-card">
      <div class="body-content-card-content-wrapper">
        <div class="body-content-card-header">
          <div class="card-text-h2">{props.title}</div>
        </div>
        <div class="body-content-card-content">{props.content}</div>
        <div class="body-content-card-footer">
          <div class="body-content-card-footer-navigation">
            <div class="body-content-card-footer-navigation-option text-link text-link-box">
              <div class="button-icon">
                <Lock />
              </div>
              <div class="button-text">Save</div>
            </div>
            <div class="card-text-caption vertical-flex">
              Confirm the information above to prevent cancellations and lapse
              of services.
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default ContentCard;
