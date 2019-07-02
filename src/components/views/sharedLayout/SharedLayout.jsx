import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/aux/Aux';
import styles from './sharedLayout.scss';
import Toolbar from './toolbar/Toolbar';
import SideMenu from './sideMenu/SideMenu';

const propTypes = {
  children: PropTypes.object,
};

const defaultProps = {
  children: {},
};

export class SharedLayout extends Component {
  state = {
    showSideMenu: false,
  };

  sideMenuCloseHandler = () => {
    this.setState({
      showSideMenu: false,
    });
  };

  sideMenuToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideMenu: !prevState.showSideMenu,
      };
    });
  };

  render() {
    const { children } = this.props;
    const { showSideMenu } = this.state;

    return (
      <Aux>
        <Toolbar onSideMenuToggle={this.sideMenuToggleHandler} />
        <SideMenu open={showSideMenu} onClose={this.sideMenuCloseHandler} />
        <main className={styles.main}>{children}</main>
      </Aux>
    );
  }
}

SharedLayout.propTypes = propTypes;
SharedLayout.defaultProps = defaultProps;
