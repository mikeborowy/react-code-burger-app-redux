import { INGREDIENTS_PRICES } from '../../constants/ingredients';
// API
import { burgerAPI } from '../../services/api/index';

//Types
export const actionTypes = {
    ADD_INGREDIENT: 'ADD_INGREDIENT',
    REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',
    GET_INGREDIENTS: 'GET_INGREDIENTS',
    GET_INGREDIENTS_ERR: 'GET_INGREDIENTS_ERR',
    SET_INGREDIENTS: 'SET_INGREDIENTS'
}
//Action creators
export const onAddIngredient = (ingredientName) => ({ type: actionTypes.ADD_INGREDIENT, ingredientName });
export const onRemoveIngredient = (ingredientName) => ({ type: actionTypes.REMOVE_INGREDIENT, ingredientName });
export const onGetIngredient = (ingredients) => ({ type: actionTypes.GET_INGREDIENTS, ingredients });
export const onGetIngredientError = () => ({ type: actionTypes.GET_INGREDIENTS_ERR });
export const onSetIngredient = (ingredients) => ({ type: actionTypes.SET_INGREDIENTS, ingredients });


//API Action creators
export const onGetIngredientsAPI = (ingredients) => async (dispatch) => {
    const call = await burgerAPI.get(`https://react-burger-app-617db.firebaseio.com/ingredients.json`)
        .then(response => {
            const ingredients = response.data;
            dispatch(onSetIngredient(ingredients));
        })
        .catch( error => {
            dispatch(onGetIngredientError());
        });

    return call;
};

export const onSetIngredients = (ingredients) => ({ type: actionTypes.SET_INGREDIENTS, ingredients });

//Reducer Model
const inistialState = {
    ingredients: {},
    totalPrice: 0,
    error: false
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

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                error: false
            }
        case actionTypes.GET_INGREDIENTS_ERR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};