import React, { Component } from 'react';
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

class ContactData extends Component {

    state = {
        orderForm: ORDER_FORM,
        formIsValid: false,
    }

    orderHandler = (evt) => {
        evt.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            userId: this.props.userId,
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData
        }
        this.props.onOrderBurgerSetAPI(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        });
    }

    renderForm = () => {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        const inputs = formElementsArray.map(formElement => {

            const inputProps = {
                key: formElement.id,
                elementType: formElement.config.elementType,
                elementConfig: formElement.config.elementConfig,
                value: formElement.config.value,
                invalid: !formElement.config.valid,
                shouldValidate: formElement.config.validation,
                touched: formElement.config.touched,
                onChange: (event) => this.inputChangedHandler(event, formElement.id)
            }

            return <Input {...inputProps}/>
        });

        if(this.props.isLoading) {
            return <Spinner />
        }

        return (
            <form onSubmit={this.orderHandler}>
                {inputs}
                <Button
                    type={BUTTONS.SUCCESS}
                    onClick={this.orderHandler}
                >
                    Order
                </Button>
            </form>
        )
    }

    render() {
        return (
            <div className={styles.contactData}>
                <h4>Enter your Contact Data</h4>
                {this.renderForm()}
            </div>
        );
    }
}

const ContactDataWithError = withErrorHandler(ContactData, burgerAPI.burger);

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        isLoading: state.order.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onOrderBurgerSetAPI
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDataWithError);