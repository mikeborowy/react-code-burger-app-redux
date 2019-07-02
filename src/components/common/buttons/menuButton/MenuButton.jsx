import React from 'react';
import classes from './menuButton.scss';

export const MenuButton = (props) => {
  const { onToggle } = props;
  return (
    <div className={classes.menuButton} onClick={onToggle}>
      <div />
      <div />
      <div />
    </div>
  );
};
