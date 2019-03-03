import React from 'react';

import images from '../../../assets/images/index';
import styles from './logo.scss';

const Logo = (props) => (
    <div className={styles.logo} style={{height: props.height}}>
        <img src={images.logo} alt="MyBurger" />
    </div>
);

export default Logo;