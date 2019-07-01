import React from 'react';
import styles from './overlay.scss';

export const Overlay = props =>
  props.isOpen ? <div className={styles.overlay} onClick={props.onClose} /> : null;
