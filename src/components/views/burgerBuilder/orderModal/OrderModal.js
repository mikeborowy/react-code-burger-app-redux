import React from 'react';
import Aux from '../../../hoc/aux/Aux';
import Button from '../../../common/buttons/button/Button';
import { BUTTONS } from '../../../../constants/buttons';

export const OrderSummary = (props) => {
  const { ingredients, totalPrice, onPurchaseContinue, onPurchaseCancel } = props;
  const renderSummaryList = Object.keys(ingredients).map((ingredient, idx) => {
    return (
      <li key={`ing-${idx * Math.random()}`}>
        <span
          style={{
            textTransform: 'capitalize',
          }}
        >
          {ingredient}:
        </span>
        {` ${ingredients[ingredient]}`}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with:</p>
      <ul>{renderSummaryList}</ul>
      <p>
        <strong>Total Price: {totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button type={BUTTONS.DANGER} onClick={onPurchaseCancel}>
        Cancel
      </Button>
      <Button type={BUTTONS.SUCCESS} onClick={onPurchaseContinue}>
        Continue
      </Button>
    </Aux>
  );
};
