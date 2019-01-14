import React from 'react';
import SquadIcon from '../../assets/icons/selected/squad';

function SideMenu(props) {
  return (
    <div class="menu">
      <div class="menu-row-wrapper">
        <div class="menu-icon">
          <SquadIcon />
        </div>
        <div class="menu-option">Squads</div>
      </div>
      <div class="menu-row-wrapper">
        <div class="menu-icon">
          <SquadIcon />
        </div>
        <div class="menu-option">Discover</div>
      </div>
      <div class="menu-row-wrapper">
        <div class="menu-icon">
          <SquadIcon />
        </div>
        <div class="menu-option">Payout</div>
      </div>
      <div class="menu-row-wrapper">
        <div class="menu-icon">
          <SquadIcon />
        </div>
        <div class="menu-option">Account</div>
      </div>
    </div>
  );
}

export default SideMenu;
