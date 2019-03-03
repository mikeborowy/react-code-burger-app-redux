import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from './checkoutSummary/CheckoutSummary';
import ContactData from './contactData/ContactData';
import { ROUTES } from '../../../constants/routes';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if(param[0] === 'totalPrice') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients,
            totalPrice
        });
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(`${ROUTES.CHECKOUT.LINK}${ROUTES.CONTACT_DATA.LINK}`);
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {

        const contactDataProps = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice
        }

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutContinue={this.checkoutContinueHandler}
                    onCheckoutCancel={this.checkoutCancelHandler}
                />
                <Route
                    path={this.props.match.path + ROUTES.CONTACT_DATA.LINK}
                    render={props => {
                        return (
                            <ContactData
                                {...props}
                                {...contactDataProps}
                            />)
                    }}
                />
            </div>
        );
    }
}

export default Checkout;