import { combineReducers } from 'redux';
import auth from './auth';
import burger from './burger';
import order from './order';

export const rootReducers = combineReducers({
  auth,
  burger,
  order,
});
