import React, { Component } from 'react';
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../helpers/index';
//hoc
import withStore from './hoc/withStore/withStore';
import { ROUTES } from '../constants/routes';

//Dynamic imports
import {
  SharedLayout,
  BurgerBuilder,
  Checkout,
  Orders
} from './views/views';

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