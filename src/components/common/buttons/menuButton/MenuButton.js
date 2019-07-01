import React from 'react';
import classes from './menuButton.scss';

const MenuButton = props => {
  return (
    <div className={classes.menuButton} onClick={props.onToggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default MenuButton;
