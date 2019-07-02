import React from 'react';
import { Burger } from '../../../common/burger/Burger';
import Button from '../../../common/buttons/button/Button';
import { BUTTONS } from '../../../../constants/buttons';
import styles from './checkoutSummary.scss';

export const CheckoutSummary = (props) => {
  const { ingredients, onCheckoutCancel, onCheckoutContinue } = props;
  return (
    <div className={styles.checkoutSummary}>
      <h1>We hope it tastes well</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Burger ingredients={ingredients} />
      </div>
      <Button type={BUTTONS.DANGER} onClick={onCheckoutCancel}>
        Cancel
      </Button>
      <Button type={BUTTONS.SUCCESS} onClick={onCheckoutContinue}>
        Continue
      </Button>
    </div>
  );
};
