import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Navbar(props) {
  return (
    <div class="header-container">
      <div class="header-left" />
      <div class="header-right">
        <div class="header-nav-wrapper">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle2">New?</Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
