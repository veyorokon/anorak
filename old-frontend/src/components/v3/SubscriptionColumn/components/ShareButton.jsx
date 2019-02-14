import React from 'react';
import Button from '@material-ui/core/Button';

import { ReactComponent as SquadIcon } from '../../../../assets/icons/basic/squad.svg';

import './style.css';

function ShareButton(props) {
  return (
    <Button size="small" className="Share-Button">
      <SquadIcon className="Share-Button-Icon" />
      <span className="Share-Button-Text">Share</span>
    </Button>
  );
}

export default ShareButton;
