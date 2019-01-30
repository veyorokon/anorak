import React from 'react';

import Button from '@material-ui/core/Button';

import { IconCardContainer, Icon } from './styles.jsx';

const IconCard = props => {
  let iconType;

  if (props.icon === 'arrow') {
    iconType = <Icon bgColor="lightgreen">T</Icon>;
  } else if (props.icon === 'note') {
    iconType = <Icon bgColor="lightblue">E</Icon>;
  } else if (props.icon === 'globe') {
    iconType = <Icon bgColor="purple">S</Icon>;
  } else {
    iconType = <Icon bgColor="lightgray">T</Icon>;
  }

  return (
    <IconCardContainer>
      {iconType}
      <p>{props.title}</p>
      <Button style={{ fontSize: '0.67rem' }}>Learn More </Button>
    </IconCardContainer>
  );
};

export default IconCard;
