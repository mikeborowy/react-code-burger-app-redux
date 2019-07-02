import React, { Component } from 'react';
import { getDisplayName } from '../../../helpers/index';

export const withAux = (WrappedComponent) => {
  class WithAux extends Component {
    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  WithAux.displayName = `withAux(${getDisplayName(WrappedComponent)})`;

  return WithAux;
};
