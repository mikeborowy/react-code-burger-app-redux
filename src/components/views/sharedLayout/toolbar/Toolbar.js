import React from 'react';
import styles from './toolbar.scss';
import Logo from '../../../common/logo/Logo';
import Navigation from '../../../common/navigation/Navigation';
import MenuButton from '../../../common/buttons/menuButton/MenuButton';

export const Toolbar = props => {
  const { onSideMenuToggle } = props;

  const { toolbar, logo, desktopOnly } = styles;

  return (
    <header className={toolbar}>
      <MenuButton onToggle={onSideMenuToggle} />
      <div className={logo}>
        <Logo />
      </div>
      <nav className={desktopOnly}>
        <Navigation />
      </nav>
    </header>
  );
};
