import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.scss';
import { INGREDIENTS } from '../../../../constants/ingredients';

class Ingredient extends PureComponent {

    static propTypes = {
        type: PropTypes.string.isRequired
    }

    render() {
    let ingredient = null;

    switch (this.props.type) {
        case INGREDIENTS.BREAD_BOTTOM:
            ingredient = (
                <div className={styles[INGREDIENTS.BREAD_BOTTOM]}>
                    
                </div>
            );
            break;
        case INGREDIENTS.BREAD_TOP:
            ingredient = (
                <div className={styles[INGREDIENTS.BREAD_TOP]}>
                    <div className={styles['seeds-1']}></div>
                    <div className={styles['seeds-2']}></div>
                </div>
            );
            break;
        case INGREDIENTS.MEAT:
            ingredient = (
                <div className={styles[INGREDIENTS.MEAT]}>
                    
                </div>
            );
            break;
        case INGREDIENTS.CHEESE:
            ingredient = (
                <div className={styles[INGREDIENTS.CHEESE]}>
                    
                </div>
            );
            break;
        case INGREDIENTS.SALAD:
            ingredient = (
                <div className={styles[INGREDIENTS.SALAD]}>
                    
                </div>
            );
            break;
        case INGREDIENTS.BACON:
            ingredient = (
                <div className={styles[INGREDIENTS.BACON]}>
                    
                </div>
            );
            break;
        default:
            ingredient = null;
            break;
    }

    return ingredient;
    }
};

export default Ingredient;