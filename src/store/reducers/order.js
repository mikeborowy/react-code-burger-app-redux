import { INGREDIENTS_PRICES } from '../../constants/ingredients';

//Types
export const actionTypes = {
    ADD_INGREDIENT: 'ADD_INGREDIENT',
    REMOVE_INGREDIENT: 'REMOVE_INGREDIENT'
}
//Action creators
export const onAddIngredient = (ingredientName) => ({ type: actionTypes.ADD_INGREDIENT, ingredientName });
export const onRemoveIngredient = (ingredientName) => ({ type: actionTypes.REMOVE_INGREDIENT, ingredientName });

//Reducer Model
const inistialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
};

//Reducer
export default (state = inistialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName.toUpperCase()]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName.toUpperCase()]
            };
        default:
            return state;
    }
};