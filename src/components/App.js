import React, { Component } from 'react';
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../helpers/index';
//hoc
import withAsync from '../components/hoc/withAsync/withAsync';
import withStore from './hoc/withStore/withStore';
//sharedLayout
import SharedLayout from './sharedLayout/SharedLayout';
import { ROUTES } from '../constants/routes';
//Dynamic imports
const BurgerBuilder = withAsync(() => {
  return import('../components/views/burgerBuilder/BurgerBuilder');
})

const Checkout = withAsync(() => {
  return import('../components/views/checkout/Checkout');
})

const Orders = withAsync(() => {
  return import('../components/views/orders/Orders');
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
            <SharedLayout>
              <Switch>
                <Route
                  path={ROUTES.BUILDER.LINK}
                  component={BurgerBuilder}
                  exact
                />
                <Route
                  path={ROUTES.CHECKOUT.LINK}
                  component={Checkout}
                />
                <Route
                  path={ROUTES.ORDERS.LINK}
                  component={Orders}
                />
                <Redirect to={ROUTES.BUILDER.LINK} />
              </Switch>
            </SharedLayout>
        </Router>
      </div>
    );
  }
}

export default withStore(App);