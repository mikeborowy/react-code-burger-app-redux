import React from 'react';
import PropTypes from 'prop-types';
import classes from './sideMenu.scss';
import Logo from '../../../common/logo/Logo';
import { Navigation } from '../../../common/navigation/Navigation';
import { Overlay } from '../../../common/overlay/Overlay';
import { Aux } from '../../../hoc/aux/Aux';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const defaultProps = {
  open: false,
  onClose: () => {},
};

export const SideMenu = (props) => {
  const { open, onClose } = props;
  const { sideMenu, close, logo } = classes;
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

SideMenu.propTypes = propTypes;
SideMenu.defaultProps = defaultProps;
