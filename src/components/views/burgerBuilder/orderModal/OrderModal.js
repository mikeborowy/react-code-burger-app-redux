import React from 'react';
import Aux from '../../../hoc/aux/Aux';
import Button from '../../../common/buttons/button/Button';
import { BUTTONS } from '../../../../constants/buttons';

const OrderSummary = (props) => {
    const renderSummaryList = Object.keys(props.ingredients)
        .map((ingredient, idx) => (
            <li key={`ing-${idx}`}>
                <span style={{textTransform:'capitalize'}}>
                    {ingredient}:
                </span>
                {` ${props.ingredients[ingredient]}`}
            </li>
        ));

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with:</p>
            <ul>
                {renderSummaryList}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                type={BUTTONS.DANGER}
                onClick={props.onPurchaseCancel}
            >
                Cancel
            </Button>
            <Button
                type={BUTTONS.SUCCESS}
                onClick={props.onPurchaseContinue}
            >
                Continue
            </Button>
        </Aux>
    );
};

export default OrderSummary;