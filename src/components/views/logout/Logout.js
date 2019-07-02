import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onLogout } from '../../../store/reducers/auth';

class LogoutComponent extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onLogout,
    },
    dispatch
  );
};

export const Logout = connect(
  null,
  mapDispatchToProps
)(LogoutComponent);
