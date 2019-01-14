import React from 'react';
import Paper from '@material-ui/core/Paper';

function ContentCard(props) {
  return (
    <Paper className="body-content-card">
      <div class="body-content-card-content-wrapper">
        <div class="body-content-card-header">title</div>
        <div class="body-content-card-content">content</div>
        <div class="body-content-card-footer">footer</div>
      </div>
    </Paper>
  );
}

export default ContentCard;
