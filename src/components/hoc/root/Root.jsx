import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configStore from '../../../config/store';

const propTypes = {
  children: PropTypes.object,
  initialState: PropTypes.object,
};

const defaultProps = {
  children: {},
  initialState: {},
};

export const Root = (props) => {
  const { initialState, children } = props;
  return <Provider store={configStore(initialState)}>{children}</Provider>;
};

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;
