import React from 'react';
import styles from './buildControl.scss';

const BuildControl = (props) => {
    return (
        <div className={styles.buildControl}>
             <div className={styles.label}>{props.label}</div>
             <button
                className={styles.less}
                onClick={props.onRemoveIngredient}
                disabled={props.disabled}
            >
            Less
            </button>
             <button
                className={styles.more}
                onClick={props.onAddIngredient}
             >
             More
             </button>
        </div>
    );
};

export default BuildControl;