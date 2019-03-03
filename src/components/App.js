import React, { Component } from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers/index';

import SharedLayout from './sharedLayout/SharedLayout';
import BurgerBuilder from '../components/views/burgerBuilder/BurgerBuilder';
import Checkout from '../components/views/checkout/Checkout';
import Orders from '../components/views/orders/Orders';
import withStore from './hoc/withStore/withStore';
import { ROUTES } from '../constants/routes';

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
              </Switch>
            </SharedLayout>
        </Router>
      </div>
    );
  }
}

export default withStore(App);