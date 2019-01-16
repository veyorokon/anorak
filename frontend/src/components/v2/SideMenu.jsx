import React from 'react';
import SelectedIcons from '../../assets/icons/selected';
import UnSelectedIcons from '../../assets/icons/unselected';

const SelectedSquad = SelectedIcons['Squad'];
const UnSelectedSquad = UnSelectedIcons['Squad'];

const SelectedDiscover = SelectedIcons['Discover'];
const UnSelectedDiscover = UnSelectedIcons['Discover'];

const SelectedPayout = SelectedIcons['Payout'];
const UnSelectedPayout = UnSelectedIcons['Payout'];

const SelectedAccount = SelectedIcons['Account'];
const UnSelectedAccount = UnSelectedIcons['Account'];

var data = [
  {
    name: 'Squads',
    unSelectedIcon: <UnSelectedSquad />,
    selectedIcon: <SelectedSquad />,
    selected: true
  },
  {
    name: 'Discover',
    unSelectedIcon: <UnSelectedDiscover />,
    selectedIcon: <SelectedDiscover />,
    selected: false
  },
  {
    name: 'Payout',
    unSelectedIcon: <UnSelectedPayout />,
    selectedIcon: <SelectedPayout />,
    selected: false
  },
  {
    name: 'Account',
    unSelectedIcon: <UnSelectedAccount />,
    selectedIcon: <SelectedAccount />,
    selected: false
  }
];

function SideMenu(props) {
  return (
    <div class="menu">
      {data.map((item, key) => {
        return (
          <div key={item.name} class="menu-row-wrapper">
            <div class="menu-icon">
              {item.selected ? (
                <span>{item.selectedIcon}</span>
              ) : (
                <span>{item.unSelectedIcon}</span>
              )}
            </div>
            {item.selected ? (
              <div class="menu-option-selected">{item.name}</div>
            ) : (
              <div class="menu-option">{item.name}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SideMenu;
