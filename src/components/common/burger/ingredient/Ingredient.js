import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.scss';
import { INGREDIENTS } from '../../../../constants/ingredients';

export class Ingredient extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    let ingredient = null;
    const { type } = this.props;

    switch (type) {
      case INGREDIENTS.BREAD_BOTTOM:
        ingredient = <div className={styles[INGREDIENTS.BREAD_BOTTOM]} />;
        break;
      case INGREDIENTS.BREAD_TOP:
        ingredient = (
          <div className={styles[INGREDIENTS.BREAD_TOP]}>
            <div className={styles['seeds-1']} />
            <div className={styles['seeds-2']} />
          </div>
        );
        break;
      case INGREDIENTS.MEAT:
        ingredient = <div className={styles[INGREDIENTS.MEAT]} />;
        break;
      case INGREDIENTS.CHEESE:
        ingredient = <div className={styles[INGREDIENTS.CHEESE]} />;
        break;
      case INGREDIENTS.SALAD:
        ingredient = <div className={styles[INGREDIENTS.SALAD]} />;
        break;
      case INGREDIENTS.BACON:
        ingredient = <div className={styles[INGREDIENTS.BACON]} />;
        break;
      default:
        ingredient = null;
        break;
    }

    return ingredient;
  }
}
