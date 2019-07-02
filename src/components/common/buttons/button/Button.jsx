import React from 'react';
import styles from './button.scss';

export const ModalButton = (props) => {
  const { type, onClick, children } = props;
  const className = [styles.button, styles[type]].join(' ');

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
};
