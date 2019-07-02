import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './navigation.scss';
import NavigationItem from './navigationItem/NavigationItem';
import { ROUTES } from '../../../constants/routes';

const NavigationComponent = (props) => {
  const { isAuth } = props;
  const renderAuth = () => {
    if (isAuth) {
      return (
        <Fragment>
          <NavigationItem link={ROUTES.ORDERS.LINK}>{ROUTES.ORDERS.NAME}</NavigationItem>
          <NavigationItem link={ROUTES.LOG_OUT.LINK}>{ROUTES.LOG_OUT.NAME}</NavigationItem>
        </Fragment>
      );
    }
    return <NavigationItem link={ROUTES.AUTH.LINK}>{ROUTES.AUTH.NAME}</NavigationItem>;
  };

  return (
    <ul className={classes.navigation}>
      <NavigationItem link={ROUTES.BUILDER.LINK} exact>
        {ROUTES.BUILDER.NAME}
      </NavigationItem>
      {renderAuth()}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export const Navigation = connect(mapStateToProps)(NavigationComponent);
