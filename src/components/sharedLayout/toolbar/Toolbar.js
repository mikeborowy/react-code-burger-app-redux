import React from 'react';
import styles from './toolbar.scss';
import Logo from '../../common/logo/Logo';
import Navigation from '../../common/navigation/Navigation';
import MenuButton from '../../common/buttons/menuButton/MenuButton';

const Toolbar = (props) => {
    return (
        <header className={styles.toolbar}>
            <MenuButton onToggle={props.onSideMenuToggle} />
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav className={styles.desktopOnly}>
                <Navigation />
            </nav>
        </header>
    );
};

export default Toolbar;