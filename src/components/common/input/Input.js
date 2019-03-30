import React from 'react';
import styles from './input.scss';
import { INPUTS } from '../../../constants/inputs';

const Input = ( props ) => {
    let inputElement = null;
    const inputClasses = [styles.inputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.invalid);
    }

    switch ( props.elementType ) {
        case ( INPUTS.INPUT ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
        case ( INPUTS.TEXTAREA ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
        case ( INPUTS.SELECT ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.onChange}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
    }

    return (
        <div className={styles.input}>
            <label className={styles.label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default Input;