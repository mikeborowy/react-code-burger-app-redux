import React from 'react';

import classes from './sideMenu.scss';
import Logo from '../../../common/logo/Logo';
import { Navigation } from '../../../common/navigation/Navigation';
import { Overlay } from '../../../common/overlay/Overlay';
import { Aux } from '../../../hoc/aux/Aux';

export const SideMenu = props => {
  const { open, onClose } = props;

  const { sideMenu, close } = classes;

  let attachedClasses = [sideMenu, close];

  if (open) {
    attachedClasses = [sideMenu, open];
  }
  return (
    <Aux>
      <Overlay isOpen={open} onClose={onClose} />
      <div className={attachedClasses.join(' ')}>
        <div className={logo}>
          <Logo />
        </div>
        <nav>
          <Navigation />
        </nav>
      </div>
    </Aux>
  );
};
