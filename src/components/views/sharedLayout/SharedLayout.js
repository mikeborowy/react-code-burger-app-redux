import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/aux/Aux';
import styles from './sharedLayout.scss';
import Toolbar from './toolbar/Toolbar';
import SideMenu from './sideMenu/SideMenu';

const propTypes = {
    children: PropTypes.object.isRequired
};

const defaultProps = {
    children: {}
};
class SharedLayout extends Component {

    state = {
        showSideMenu: false
    }

    sideMenuCloseHandler = () => {
        this.setState({ showSideMenu: false });
    }

    sideMenuToggleHandler = () => {
        this.setState(prevState => ({ showSideMenu: !prevState.showSideMenu }));
    }

    render(){
        return (
            <Aux>
                <Toolbar onSideMenuToggle={this.sideMenuToggleHandler}/>
                <SideMenu
                    open={this.state.showSideMenu}
                    onClose={this.sideMenuCloseHandler}
                />
                <main className={styles.main}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

SharedLayout.propTypes = propTypes;
SharedLayout.defaultProps = defaultProps;

export default SharedLayout;