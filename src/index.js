import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App';
// import Root from './components/hoc/root/Root';
import { withStore } from './components/hoc/withStore/withStore';

const AppWithStore = withStore(App);

ReactDOM.render(
  // <Root>
  //      <App />
  // </Root>
  <AppWithStore />,
  document.getElementById('root'),
);
