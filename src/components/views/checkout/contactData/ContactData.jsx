import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onOrderBurgerSetAPI } from '../../../../store/reducers/order';
import styles from './contactData.scss';
// component/common
import Button from '../../../common/buttons/button/Button';
import Input from '../../../common/input/Input';
import Spinner from '../../../common/spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// constants
import { BUTTONS } from '../../../../constants/buttons';
import { ORDER_FORM } from '../../../../constants/stateInit';
// helpers
import { checkValidity } from '../../../../helpers/index';
// services/api
import { burgerAPI } from '../../../../services/api/burger';

const propTypes = {
  userId: PropTypes.number,
  ingredients: PropTypes.shape({}),
  totalPrice: PropTypes.number,
  onOrderBurgerSetAPI: PropTypes.func,
  token: PropTypes.string,
};

const defaultProps = {
  userId: PropTypes.number,
  ingredients: PropTypes.shape({}),
  totalPrice: PropTypes.number,
  onOrderBurgerSetAPI: PropTypes.func,
  token: PropTypes.string,
};
class ContactDataComponent extends Component {
  state = {
    orderForm: ORDER_FORM,
  };

  orderHandler = (evt) => {
    evt.preventDefault();
    const { orderForm } = this.state;
    const { userId, ingredients, totalPrice, onOrderBurgerSetAPI, token } = this.props;

    const formData = {};
    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      userId,
      ingredients,
      totalPrice,
      orderData: formData,
    };
    onOrderBurgerSetAPI(order, token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
    });
  };

  renderForm = () => {
    const formElementsArray = [];
    const { orderForm } = this.state;
    const { isLoading } = this.props;

    for (const key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    }

    const inputs = formElementsArray.map((formElement) => {
      const inputProps = {
        key: formElement.id,
        elementType: formElement.config.elementType,
        elementConfig: formElement.config.elementConfig,
        value: formElement.config.value,
        invalid: !formElement.config.valid,
        shouldValidate: formElement.config.validation,
        touched: formElement.config.touched,
        onChange: (event) => {
          return this.inputChangedHandler(event, formElement.id);
        },
      };

      return <Input {...inputProps} />;
    });

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button type={BUTTONS.SUCCESS} onClick={this.orderHandler}>
          Order
        </Button>
      </form>
    );
  };

  render() {
    return (
      <div className={styles.contactData}>
        <h4>Enter your Contact Data</h4>
        {this.renderForm()}
      </div>
    );
  }
}

ContactDataComponent.propTypes = propTypes;
ContactDataComponent.defaultProps = defaultProps;

const ContactDataWithError = withErrorHandler(ContactDataComponent, burgerAPI.burger);

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onOrderBurgerSetAPI,
    },
    dispatch
  );
};

export const ContactData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDataWithError);
