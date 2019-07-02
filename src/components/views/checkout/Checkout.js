import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from './checkoutSummary/CheckoutSummary';
import ContactData from './contactData/ContactData';
import { ROUTES } from '../../../constants/routes';

const propTypes = {
  history: PropTypes.shape({}),
};
const defaultProps = {
  history: {},
};

class CheckoutComponent extends Component {
  checkoutContinueHandler = () => {
    const { history } = this.props;
    history.replace(`${ROUTES.CHECKOUT.LINK}${ROUTES.CONTACT_DATA.LINK}`);
  };

  checkoutCancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderSummary() {
    const { ingredients, isPurchased, match } = this.props;
    if (ingredients) {
      if (isPurchased) {
        return <Redirect to={ROUTES.BUILDER.LINK} />;
      }

      return (
        <Fragment>
          <CheckoutSummary
            ingredients={ingredients}
            onCheckoutContinue={this.checkoutContinueHandler}
            onCheckoutCancel={this.checkoutCancelHandler}
          />
          <Route path={match.path + ROUTES.CONTACT_DATA.LINK} component={ContactData} />
        </Fragment>
      );
    }
    return <Redirect to={ROUTES.BUILDER.LINK} />;
  }

  render() {
    return <div>{this.renderSummary()}</div>;
  }
}

CheckoutComponent.propTypes = propTypes;
CheckoutComponent.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    isPurchased: state.order.isPurchased,
  };
};

export const Checkout = connect(
  mapStateToProps,
  null
)(CheckoutComponent);
