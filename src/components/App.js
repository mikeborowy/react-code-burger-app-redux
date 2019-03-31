import React, { Component } from 'react';
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onAuthCheckState } from '../store/reducers/auth';
import { history } from '../helpers/index';
//hoc

import { ROUTES } from '../constants/routes';

//Dynamic imports
import {
  BurgerBuilder,
  Checkout,
  Orders,
  SharedLayout,
  Auth,
  Logout
} from './views/views';

class App extends Component {

  componentDidMount(){
    this.props.onAuthCheckState();
  }

  renderRoutes = () => {
    if(this.props.isAuth) {
      return (
        <Switch>
          <Route
            path={ROUTES.LOG_OUT.LINK}
            component={Logout}
          />
          <Route
            path={ROUTES.AUTH.LINK}
            component={Auth}
          />
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
      )
    }

    return (
      <Switch>
        <Route
          path={ROUTES.AUTH.LINK}
          component={Auth}
        />
        <Route
          path={ROUTES.BUILDER.LINK}
          component={BurgerBuilder}
          exact
        />
      </Switch>
      )
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
            <SharedLayout>
              {this.renderRoutes()}
            </SharedLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onAuthCheckState
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default withStore(AppWithConnect);