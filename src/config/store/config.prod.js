import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { async } from '../../middlewares/async';
import { rootReducers } from '../../reducers';
import { stateValidator } from '../../middlewares/stateValidator';

export const config = () =>
  createStore(rootReducers, applyMiddleware(reduxThunk, reduxPromise, async));
