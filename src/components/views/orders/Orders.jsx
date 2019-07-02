import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Order from './Order/Order';
import Spinner from '../../common/spinner/Spinner';
import { onOrdersGetAPI } from '../../../store/reducers/order';

const propTypes = {
  onOrdersGetAPI: PropTypes.func,
  userId: PropTypes.number,
  token: PropTypes.string,
};

const defaultProps = {
  onOrdersGetAPI: () => {},
  userId: 0,
  token: '',
};

export class OrdersComponent extends Component {
  componentDidMount() {
    const { onOrdersGetAPI, userId, token } = this.props;
    onOrdersGetAPI(userId, token);
  }

  renderOrders = () => {
    const { isLoading, orders } = this.props;
    if (isLoading) {
      return <Spinner />;
    }
    return orders.map((order) => {
      return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice} />;
    });
  };

  render() {
    return <div>{this.renderOrders()}</div>;
  }
}

OrdersComponent.propTypes = propTypes;
OrdersComponent.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    isLoading: state.order.isLoading,
    orders: state.order.orders,
    token: state.auth.token || localStorage.getItem('token'),
    userId: state.auth.userId || localStorage.getItem('userId'),
  };
};

const mapDispatchToState = (dispatch) => {
  return bindActionCreators(
    {
      onOrdersGetAPI,
    },
    dispatch
  );
};

export const Orders = connect(
  mapStateToProps,
  mapDispatchToState
)(OrdersComponent);
