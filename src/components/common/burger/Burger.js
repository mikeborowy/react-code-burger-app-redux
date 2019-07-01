import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger.scss';
import Ingredient from './ingredient/Ingredient';
import { INGREDIENTS } from '../../../constants/ingredients';

/**
 * We place propTypes and defaultProps objects before component
 * definition, however we remember to assign those objects at the
 * end of file
 */

const propTypes = {
    ingredients: PropTypes.object.isRequired
}

const defaultProps = {
    ingredients: {}
}

export const Burger = (props) => {

    const {
        ingredients,
    } = props;

    /**
     * We try to keep things simple, so we avoid using
     * complex nesting
     */

    // let renderIngredients = Object.keys(ingredients)
    //     .map(ingredient => (
    //         [...Array(ingredients[ingredient])]
    //             .map((_, idx) => (
    //                 <Ingredient
    //                     key={ingredient + '_' + idx}
    //                     type={ingredient}
    //                 />
    //             )
    //             )
    //     ))
    //     .reduce((acc, item) => [...acc, ...item], []);

    const renderIngredients = (ingredientKey) => {
        return [...Array(ingredients[ingredientKey])]
            .map((_, idx) => (
                <Ingredient
                    key={ingredientKey + '_' + idx}
                    type={ingredientKey}
                />
            ))
    };

    const renderContent = () => {
        if (Object.keys(ingredients).length === 0) {
            return null;
        }

        return Object.keys(ingredients)
            .map(ingredient => renderIngredients(ingredient))
            .reduce((acc, item) => [...acc, ...item], []);
    }

    return (
        <div className={styles.burger}>
            <Ingredient type={INGREDIENTS.BREAD_TOP} />
            {renderContent()}
            <Ingredient type={INGREDIENTS.BREAD_BOTTOM} />
        </div>
    );
};

Burger.propTypes = propTypes;
Burger.defaultProps = defaultProps;