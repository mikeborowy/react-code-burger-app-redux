/**
 * We don't separate container from component
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  onAddIngredient,
  onRemoveIngredient,
  onGetIngredientsAPI
} from '../../../store/reducers/burger';
import {
  onOrderBurgerInit
} from '../../../store/reducers/order';
import { onSetAuthRedirectPath } from '../../../store/reducers/auth';
import { BurgerBuilder } from './BurgerBuilder';

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onAddIngredient,
  onRemoveIngredient,
  onOrderBurgerInit,
  onGetIngredientsAPI,
  onSetAuthRedirectPath
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
