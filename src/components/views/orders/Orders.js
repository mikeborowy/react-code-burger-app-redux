import React, { Component } from 'react';
import Order from './Order/Order';
import { burgerAPI } from '../../../services/api/index';

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount() {
        burgerAPI.get('/orders.json')
            .then(response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key
                    });
                }

                this.setState({
                    isLoading: false,
                    orders
                });
            })
            .catch(err => {
                this.setState({isLoading: false});
            });
    }

    renderOrders = () => {
        return this.state.orders.map(order => (
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

export default Orders;