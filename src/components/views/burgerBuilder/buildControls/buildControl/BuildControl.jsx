import React from 'react';
import styles from './buildControl.scss';

export const BuildControl = (props) => {
  const { label, onRemoveIngredient, disabled, onAddIngredient } = props;
  return (
    <div className={styles.buildControl}>
      <div className={styles.label}>{label}</div>
      <button
        className={styles.less}
        onClick={onRemoveIngredient}
        disabled={disabled}
        type="button"
      >
        Less
      </button>
      <button className={styles.more} onClick={onAddIngredient} type="button">
        More
      </button>
    </div>
  );
};
