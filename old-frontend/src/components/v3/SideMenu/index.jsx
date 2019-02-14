import React from 'react';
import { withRouter } from 'react-router-dom';

import SelectedIcons from '../../../assets/icons/selected';
import UnSelectedIcons from '../../../assets/icons/unselected';

import './style.css';

const SelectedSquad = SelectedIcons['Squad'];
const UnSelectedSquad = UnSelectedIcons['Squad'];

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
          name: 'Home',
          unSelectedIcon: <UnSelectedSquad />,
          selectedIcon: <SelectedSquad />
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
      <div class="Menu">
        {this.state.data.map((item, key) => {
          return (
            <div
              key={item.name}
              class="Menu-Row-Wrapper"
              onClick={this.redirect}
            >
              <div class="Menu-Icon">
                {this.isSelected(item.name) ? (
                  <span>{item.selectedIcon}</span>
                ) : (
                  <span>{item.unSelectedIcon}</span>
                )}
              </div>
              {this.isSelected(item.name) ? (
                <div class="Menu-Option-Selected">{item.name}</div>
              ) : (
                <div class="Menu-Option">{item.name}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(SideMenu);
