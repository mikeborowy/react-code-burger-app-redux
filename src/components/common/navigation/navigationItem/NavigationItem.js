import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navigationItem.scss';

const NavigationItem = ( props ) => {
    console.log(props);
    return (
        <li className={classes.navigationItem}>
            <NavLink
                to={props.link}
                exact={props.exact}
                activeClassName={classes.active}
            >
                {props.children}
            </NavLink>
        </li>
    )
};

export default NavigationItem;