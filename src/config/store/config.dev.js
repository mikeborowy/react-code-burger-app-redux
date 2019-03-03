/*eslint-disable no-alert, no-console */
import { createStore, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import async from '../../middlewares/async';
import logger from '../../middlewares/logger';
import rootReducers from '../../reducers';
import stateValidator from '../../middlewares/stateValidator';

export default () => createStore(
    rootReducers,
    compose(
        applyMiddleware(
            reduxThunk,
            reduxPromise,
            async,
            logger,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : fn => fn
    )
);
