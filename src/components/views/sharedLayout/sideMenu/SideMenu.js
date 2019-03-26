import React from 'react';

import classes from './sideMenu.scss';
import Logo from '../../../common/logo/Logo';
import Navigation from '../../../common/navigation/Navigation';
import Overlay from '../../../common/overlay/Overlay';
import Aux from '../../../hoc/aux/Aux';

const SideMenu = ( props ) => {
    let attachedClasses = [classes.sideMenu, classes.close];
    if (props.open) {
        attachedClasses = [classes.sideMenu, classes.open];
    }
    return (
        <Aux>
            <Overlay
                isOpen={props.open}
                onClose={props.onClose}
            />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <nav>
                    <Navigation />
                </nav>
            </div>
        </Aux>
    );
};

export default SideMenu;