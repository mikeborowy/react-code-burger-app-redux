import React from 'react';
import styles from './buildControls.scss';
import BuilderControl from './buildControl/BuildControl';
import { BUILD_CONTROLS } from '../../../../constants/controls';

const BuildControls = (props) => {

    const orderBtnProps = {
        className: styles.orderButton,
        disabled: !props.purchasable,
        onClick: props.onPurchase
    }

    const renderControls = BUILD_CONTROLS.map(control => {

        const buildControlProps = {
            key: control.label,
            label: control.label,
            disabled: props.disabled[control.type],
            onAddIngredient: () => props.onAddIngredient(control.type),
            onRemoveIngredient: () => props.onRemoveIngredient(control.type)
        };

        return <BuilderControl {...buildControlProps}/>
    })

    return (
        <div className={styles.buildControls}>
            <p>Current price:
                <strong>
                    {props.totalPrice.toFixed(2)}
                </strong>
            </p>
           {renderControls}
           <button {...orderBtnProps} >ORDER NOW</button>
        </div>
    );
};

export default BuildControls;