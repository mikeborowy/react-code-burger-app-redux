import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Order from './Order/Order';
import Spinner from '../../common/spinner/Spinner';
import {
    onOrdersGetAPI,
} from '../../../store/reducers/order';

class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersGetAPI();
    }

    renderOrders = () => {

        if(this.props.isLoading) {
            return <Spinner />
        }

        return this.props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                totalPrice={order.totalPrice} />
        ))
    }

    render() {
        return (
            <div>
                {this.renderOrders()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.order.isLoading,
        orders: state.order.orders
    }
}

const mapDispatchToState = dispatch => bindActionCreators({
    onOrdersGetAPI
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Orders);