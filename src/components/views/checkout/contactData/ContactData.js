import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './contactData.scss';
// component/common
import Button from '../../../common/buttons/button/Button';
import Input from '../../../common/input/Input';
import Spinner from '../../../common/spinner/Spinner';
// constants
import { BUTTONS } from '../../../../constants/buttons';
import { ROUTES } from '../../../../constants/routes';
import { ORDER_FORM } from '../../../../constants/stateInit';
// helpers
import { checkValidity } from '../../../../helpers/index';
// services/api
import { burgerAPI } from '../../../../services/api/index';

class ContactData extends Component {

    state = {
        orderForm: ORDER_FORM,
        formIsValid: false,
        isLoading: false
    }

    orderHandler = (evt) => {
        evt.preventDefault();
        this.setState({ isLoading: true });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData
        }

        burgerAPI
            .post('/orders.json', order)
            .then((response => {
                this.setState({
                    isLoading: false
                })
                this.props.history.push(ROUTES.BUILDER.LINK);
            }))
            .catch((error) => {
                this.setState({
                    isLoading: false
                })
            });
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

        if(this.state.isLoading) {
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.order.ingredients,
        totalPrice: state.order.totalPrice,
    }
}

export default connect(mapStateToProps)(ContactData);