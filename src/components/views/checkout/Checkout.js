import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckoutSummary from './checkoutSummary/CheckoutSummary';
import ContactData from './contactData/ContactData';
import { onOrderBurgerInit } from '../../../store/reducers/order';
import { ROUTES } from '../../../constants/routes';

class Checkout extends Component {

    checkoutContinueHandler = () => {
        this.props.history.replace(`${ROUTES.CHECKOUT.LINK}${ROUTES.CONTACT_DATA.LINK}`);
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    renderSummary() {
        if (this.props.ingredients) {

            if(this.props.isPurchased) {
                return <Redirect to={ROUTES.BUILDER.LINK} />
            }

            return (
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutContinue={this.checkoutContinueHandler}
                        onCheckoutCancel={this.checkoutCancelHandler}
                        />
                    <Route
                        path={this.props.match.path + ROUTES.CONTACT_DATA.LINK}
                        component={ContactData}
                    />
                </Fragment>
            );
        }
        return <Redirect to={ROUTES.BUILDER.LINK} />
    }

    render() {
        return (
            <div>
                {this.renderSummary()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        ingredients: state.burger.ingredients,
        isPurchased: state.order.isPurchased
    }
}

export default connect(
    mapStateToProps,
    null
)(Checkout);