import React from 'react';

import images from '../../../assets/images/index';
import styles from './logo.scss';

export const Logo = (props) => {
  const { height } = props;
  return (
    <div
      className={styles.logo}
      style={{
        height,
      }}
    >
      <img src={images.logo} alt="MyBurger" />
    </div>
  );
};
