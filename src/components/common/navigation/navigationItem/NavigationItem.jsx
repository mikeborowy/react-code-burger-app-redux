import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navigationItem.scss';

export const NavigationItem = (props) => {
  const { exact, link, children } = props;
  return (
    <li className={classes.navigationItem}>
      <NavLink to={link} exact={exact} activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>
  );
};
