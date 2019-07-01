import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configStore from '../../../config/store';

const propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired,
};

const defaultProps = {
  children: {},
  initialState: {},
};

export const Root = props => {
  return <Provider store={configStore(props.initialState)}>{props.children}</Provider>;
};

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;
