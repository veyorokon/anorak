import React from 'react';
import Paper from '@material-ui/core/Paper';

function ContentCard(props) {
  return (
    <Paper className="body-content-card">
      <div class="body-content-card-content-wrapper">
        <div class="body-content-card-header">
          <div class="card-text-h2">{props.title}</div>
        </div>
        <div class="body-content-card-content">
          <table class="content-table">
            <thead class="content-table-header-wrapper">
              <th class="content-table-header">Name</th>
              <th class="content-table-header">Size</th>
              <th class="content-table-header">Capacity</th>
              <th class="content-table-header">Price</th>
              <th class="content-table-header">Created</th>
              <th class="content-table-header">Secret</th>
            </thead>

            <tbody class="content-table-body-wrapper">
              <tr class="content-table-body-row">
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
              </tr>
              <tr class="content-table-body-row">
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
                <td class="content-table-body-cell">test</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="body-content-card-footer">footer</div>
      </div>
    </Paper>
  );
}

export default ContentCard;
