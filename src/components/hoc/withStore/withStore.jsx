import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configStore from '../../../config/store';
import { getDisplayName } from '../../../helpers';

export const withStore = (WrappedComponent, initialState = {}) => {
  // class WithStore extends Component {
  //   render() {
  //     return (
  //       <Provider store={configStore(initialState)}>
  //         <WrappedComponent />
  //       </Provider>
  //     );
  //   }
  // }
  //   WithStore.displayName = `withStore(${getDisplayName(WrappedComponent)})`;
  //   return WithStore;
  // };
  return (
    <Provider store={configStore(initialState)}>
      <WrappedComponent />
    </Provider>
  );
};
