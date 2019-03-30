import React from 'react';

import classes from './navigation.scss';
import NavigationItem from './navigationItem/NavigationItem';
import { ROUTES } from '../../../constants/routes';

function Navigation () {
    return (
        <ul className={classes.navigation}>
            <NavigationItem link={ROUTES.BUILDER.LINK} exact>
                {ROUTES.BUILDER.NAME}
            </NavigationItem>
            <NavigationItem link={ROUTES.ORDERS.LINK}>
                {ROUTES.ORDERS.NAME}
            </NavigationItem>
            <NavigationItem link={ROUTES.AUTH.LINK}>
                {ROUTES.AUTH.NAME}
            </NavigationItem>
        </ul>
    )
};

export default Navigation;