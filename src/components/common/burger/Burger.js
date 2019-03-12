import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger.scss';
import Ingredient from './ingredient/Ingredient';
import { INGREDIENTS } from '../../../constants/ingredients';

const propTypes = {
    ingredients: PropTypes.object.isRequired
}

const Burger = (props) => {

    let renderIngredients = Object.keys(props.ingredients)
        .map(ingredient => (
            [...Array( props.ingredients[ingredient] )]
                .map((_, idx) => (
                        <Ingredient
                            key={ingredient + '_' + idx}
                            type={ingredient}
                        />
                    )
                )
        ))
        .reduce((acc, item) => [...acc, item], []);

    if (renderIngredients.length === 0) renderIngredients = <p>Please add ingredients</p>;

    return (
        <div className={styles.burger}>
            <Ingredient type={INGREDIENTS.BREAD_TOP}/>
            {renderIngredients}
            <Ingredient type={INGREDIENTS.BREAD_BOTTOM}/>
        </div>
    );
};

Burger.propTypes = propTypes;

export default Burger;