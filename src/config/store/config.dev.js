/* eslint-disable no-alert, no-console */
import { createStore, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { async } from '../../store/middlewares/async';
import { logger } from '../../store/middlewares/logger';
// import stateValidator from '../../store/middlewares/stateValidator';
import { rootReducers } from '../../store/reducers';

export const config = () =>
  createStore(
    rootReducers,
    compose(
      applyMiddleware(reduxThunk, reduxPromise, async, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (fn) => fn
    )
  );
