import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from './checkoutSummary/CheckoutSummary';
import ContactData from './contactData/ContactData';
import { ROUTES } from '../../../constants/routes';

class Checkout extends Component {

    checkoutContinueHandler = () => {
        this.props.history.replace(`${ROUTES.CHECKOUT.LINK}${ROUTES.CONTACT_DATA.LINK}`);
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    onCheckoutContinue={this.checkoutContinueHandler}
                    onCheckoutCancel={this.checkoutCancelHandler}
                />
                <Route
                    path={this.props.match.path + ROUTES.CONTACT_DATA.LINK}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.order.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);