import React from 'react';
import { Link } from 'react-router-dom';
import classes from './navigationItem.scss';

const NavigationItem = ( props ) => (
    <li className={classes.navigationItem}>
        <Link 
            to={props.link}
            className={props.active ? classes.active : null}
        >
            {props.children}
        </Link>
    </li>
);

export default NavigationItem;