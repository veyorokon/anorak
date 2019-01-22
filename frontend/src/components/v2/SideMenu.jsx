import React from 'react';
import { withRouter } from 'react-router-dom';

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

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Squads',
          unSelectedIcon: <UnSelectedSquad />,
          selectedIcon: <SelectedSquad />
        },
        {
          name: 'Discover',
          unSelectedIcon: <UnSelectedDiscover />,
          selectedIcon: <SelectedDiscover />
        },
        {
          name: 'Payout',
          unSelectedIcon: <UnSelectedPayout />,
          selectedIcon: <SelectedPayout />
        },
        {
          name: 'Account',
          unSelectedIcon: <UnSelectedAccount />,
          selectedIcon: <SelectedAccount />
        }
      ],
      selected: ''
    };
  }

  isSelected(page) {
    let url = window.location.href;
    let active = url.split('/')[3];
    let selected = active === page.toLowerCase();
    return selected;
  }

  setSelected(page) {
    this.setState({ selected: page.toLowerCase() });
  }

  redirect = event => {
    let pageClicked = event.target.textContent.toLowerCase();
    this.props.history.push('/' + pageClicked);
  };

  render() {
    return (
      <div class="menu">
        {this.state.data.map((item, key) => {
          return (
            <div
              key={item.name}
              class="menu-row-wrapper"
              onClick={this.redirect}
            >
              <div class="menu-icon">
                {this.isSelected(item.name) ? (
                  <span>{item.selectedIcon}</span>
                ) : (
                  <span>{item.unSelectedIcon}</span>
                )}
              </div>
              {this.isSelected(item.name) ? (
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
}

export default withRouter(SideMenu);
