import React from 'react';
import styles from './order.scss';

const Order = props => {
  const renderIngredients = () => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      });
    }

    return ingredients.map(ig => {
      const style = {
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      };

      const props = {
        style,
        key: ig.name,
      };

      return (
        <span {...props}>
          {ig.name} ({ig.amount})
        </span>
      );
    };

  };

  return (
    <div className={styles.order}>
      <p>Ingredients: {renderIngredients()}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
