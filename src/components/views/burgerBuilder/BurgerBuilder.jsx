/** We import at first libraries, then
 * components, imports should be sorted alphabetically
 * PROPOSAL: automate it
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux <- BAD: we don't make comments or empty lines to group
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/**
 * We use trialing comma
 *
 * If there are more than 1 imported methods
 * use next line separation
 */
import {
  onAddIngredient,
  onGetIngredientsAPI,
  onRemoveIngredient,
} from '../../../store/reducers/burger';
import { onOrderBurgerInit } from '../../../store/reducers/order';
import { onSetAuthRedirectPath } from '../../../store/reducers/auth';
// Redux <- BAD: we don't make comments or empty lines to group
import Aux from '../../hoc/aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// Redux <- BAD: we don't make comments or empty lines to group
import Spinner from '../../common/spinner/Spinner';
import { Burger } from '../../common/burger/Burger';
import BuildControls from './buildControls/BuildControls';
import Modal from '../sharedLayout/modal/Modal';
import OrderModal from './orderModal/OrderModal';
// Redux <- BAD: we don't make comments or empty lines to group
// <- BAD: we don't make comments or empty lines to group
import { ROUTES } from '../../../constants/routes';
// Redux <- BAD: we don't make comments or empty lines to group
import { burgerAPI } from '../../../services/api/burger';
import { Ingredient } from '../../../propTypes/ingredient';

class BurgerBuilderComponent extends Component {
  /**
   * Every component needs to have propTypes
   *
   * We don't need to destructure object in
   * here since we need valid array rather then object
   *
   * We create separate proptypes file in ./src/propTypes
   * folder
   * */
  static propTypes = {
    ingredients: PropTypes.object,
    isAuth: PropTypes.bool,
    isError: PropTypes.bool,
    totalPrice: PropTypes.number,
    onAddIngredient: PropTypes.func,
    onGetIngredientsAPI: PropTypes.func,
    onOrderBurgerInit: PropTypes.func,
    onSetAuthRedirectPath: PropTypes.func,
    onRemoveIngredient: PropTypes.func,
  };

  /**
   * We use default props just for non-required props
   */
  static defaultProps = {
    ingredients: {},
    isAuth: false,
    isError: false,
    totalPrice: 0,
    onAddIngredient: () => {},
    onGetIngredientsAPI: () => {},
    onOrderBurgerInit: () => {},
    onSetAuthRedirectPath: () => {},
    onRemoveIngredient: () => {},
  }; // <-- !!! EVERY COMPONENT SHOULD BE INDEPENDENT SO IT SHOULD HAS DEFAULT ALL PROPS

  /**
   * Always define default state;
   *
   * All state keys used in components
   * need to be initializated in state declaration
   *
   * If there is constructor, move state declaration
   * to it (unlike in this example)
   */
  state = {
    isPurchasing: false,
    isLoading: false,
  };

  constructor(props) {
    super(props);
    /**
     * Put bindings at bottom of constructor
     */
    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * All lifecycle methods are right after state or constructor
   */
  componentDidMount() {
    const { onGetIngredientsAPI } = this.props;
    onGetIngredientsAPI();
    window.addEventListener('resize', this.handleResizeArrow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeArrow);
  }

  /**
   * We always wite arrow functions with curly braces except when
   * arrow function is parameter like in higher order function .map
   *
   * Use meannigful variable naming
   *
   * Parameter always is placed between brackets
   */
  handleResizeArrow = (event) => {
    /** Do something */
  };

  /**
   * We use mostly arrow functions, however if you want to use function
   * as callback, bind it in constructor
   */

  handleResize() {
    /** Do something */
  }

  /** If line charactes are excedeed split it into next lines */
  moreThanThreeParamsFunction = (param1, param2, param3, param4) => {
    /** Do something */
  };

  /**
   * We don't desctucture objects in method brackets
   */

  badExampleFunction = ({ param1, param2, param3 }) => {
    /** Do something */
  };

  /**
   * We use prefixes for methods and variables
   * For handlers we use 'handle' verb prefix
   */

  handlePurchase = () => {
    const { isAuth, history, onSetAuthRedirectPath } = this.props;
    if (!isAuth) {
      onSetAuthRedirectPath(ROUTES.CHECKOUT.LINK);
      history.push(ROUTES.AUTH.LINK);
    }
    this.setState({
      isPurchasing: true,
    });
  };

  handleContinuePurchase = () => {
    const { history, onOrderBurgerInit } = this.props;
    onOrderBurgerInit();
    history.push(ROUTES.CHECKOUT.LINK);
  };

  handleCancelPurchase = () => {
    this.setState({
      isPurchasing: false,
    });
  };

  handleUpdatePurchase = (ingredients) => {
    /**
     * We do method chaining with next line after first method
     */
    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((sum, item) => {
        return sum + item;
      }, 0);

    return sum > 0;
  };

  /**
   * If method or varaible return boolean shoul be started
   * with 'is' prefix
   */
  isDisabled = () => {
    const { ingredients } = this.props;
    const disabledInfo = {
      ...ingredients,
    };
    for (const ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
    }

    return disabledInfo;
  };

  /**
   * Instaed of placing logic responsible for rendering component
   * use helper method with 'render' prefix in name
   */
  renderSummaryModal = () => {
    const { ingredients, totalPrice } = this.props;
    const { isPurchasing } = this.state;
    /**
     * If component has more than 3 props you can place
     * them in object with 'propsFor' prefix
     */
    const propsForOrderModal = {
      ingredients,
      totalPrice,
      onPurchaseContinue: this.handleContinuePurchase,
      onPurchaseCancel: this.handleCancelPurchase,
    };

    return (
      /**
       * If component has more than one prop
       * separate them by using next line
       */
      <Modal isOpen={isPurchasing} onClose={this.handleCancelPurchase}>
        <OrderModal {...propsForOrderModal} />
      </Modal>
    );
  };

  /**
   * Return component or null
   */
  renderApetizers = () => {
    const { isLoading } = this.state;

    if (!isLoading) {
      return <div>{/* List of apetizers... */}</div>;
    }

    return null;
  };

  renderBurger = () => {
    const { ingredients, totalPrice, isError, onAddIngredient, onRemoveIngredient } = this.props;
    const propsForBurger = {
      ingredients,
    };
    /**
     * When component has more than 3 props use object
     * to wrap all of them
     */
    const propsForBuildControls = {
      purchasable: this.handleUpdatePurchase(ingredients),
      totalPrice,
      disabled: this.isDisabled(),
      onAddIngredient,
      onRemoveIngredient,
      onPurchase: this.handlePurchase,
    };

    /**
     * If return staemen is placed in next line use curlys
     * brackets to wrapp it
     */
    if (!ingredients) {
      return <Spinner />;
    }

    /**
     * If ternary expression is short use it as below
     * otherwise create 'render' prefix helper method
     */
    return (
      <Aux>
        {!isError ? <Burger {...propsForBurger} /> : <p>Error has occured</p>}
        <BuildControls {...propsForBuildControls} />
      </Aux>
    );
  };

  /**
   * React component render methos should be always at end
   * of class
   *
   * Render method shouls be always clear as much as it is possible
   *
   * Instead of destructuring nested state or props use
   * lodash 'get' method
   */
  render() {
    return (
      <Aux>
        {this.renderSummaryModal()}
        {this.renderBurger()}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    isAuth: state.auth.token !== null,
    isError: state.burger.error,
    totalPrice: state.burger.totalPrice,
  };
};

/**
 * Use 'bindActionCreators' to wrap all
 * Action Creators
 */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onAddIngredient,
      onGetIngredientsAPI,
      onOrderBurgerInit,
      onRemoveIngredient,
      onSetAuthRedirectPath,
    },
    dispatch
  );
};

/**
 * Use named exports for components
 *
 * If component will become container (will be wrapped in connect HOC)
 * give it 'Component' suffix and export it connected with previous name
 */
export const BurgerBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilderComponent);

/**
 * When use HOC assign it first to variable
 * and export it as named component
 */
// const WithErrorBurgerBuilder = withErrorHandler(BurgerBuilderComponent, burgerAPI.burger);

// export const BurgerBuilder = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(WithErrorBurgerBuilder);
