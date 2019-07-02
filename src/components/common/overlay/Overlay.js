import React from 'react';
import styles from './overlay.scss';

export const Overlay = (props) => {
  const { isOpen, onClose } = props;
  const { overlay } = styles;
  return isOpen ? <div className={overlay} onClick={onClose} /> : null;
};
