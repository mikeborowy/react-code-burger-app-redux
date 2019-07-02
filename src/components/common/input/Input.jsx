import React from 'react';
import styles from './input.scss';
import { INPUTS } from '../../../constants/inputs';

export const Input = (props) => {
  const {
    touched,
    shouldValidate,
    invalid,
    label,
    elementType,
    elementConfig,
    value,
    onChange,
  } = props;
  let inputElement = null;
  const inputClasses = [styles.inputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(styles.invalid);
  }

  switch (elementType) {
    case INPUTS.INPUT:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case INPUTS.TEXTAREA:
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case INPUTS.SELECT:
      inputElement = (
        <select className={inputClasses.join(' ')} value={value} onChange={onChange}>
          {elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
  }

  return (
    <div className={styles.input}>
      <label className={styles.label} htmlFor={inputElement.name}>
        {label}
      </label>
      {inputElement}
    </div>
  );
};
