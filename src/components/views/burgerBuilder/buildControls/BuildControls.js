import React from 'react';
import styles from './buildControls.scss';
import BuilderControl from './buildControl/BuildControl';
import { BUILD_CONTROLS } from '../../../../constants/controls';

export const BuildControls = (props) => {
  const {
    purchasable,
    onPurchase,
    totalPrice,
    disabled,
    onAddIngredient,
    onRemoveIngredient,
  } = props;

  const orderBtnProps = {
    className: styles.orderButton,
    disabled: !purchasable,
    onClick: onPurchase,
  };

  const renderControls = BUILD_CONTROLS.map((control) => {
    const buildControlProps = {
      key: control.label,
      label: control.label,
      disabled: disabled[control.type],
      onAddIngredient: () => {
        return onAddIngredient(control.type);
      },
      onRemoveIngredient: () => {
        return onRemoveIngredient(control.type);
      },
    };

    return <BuilderControl {...buildControlProps} />;
  });

  return (
    <div className={styles.buildControls}>
      <p>
        Current price:
        <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      {renderControls}
      <button type="button" {...orderBtnProps}>
        ORDER NOW
      </button>
    </div>
  );
};
