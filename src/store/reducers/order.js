// API
import { burgerAPI } from '../../services/api/index';

//Types
export const actionTypes = {
    ORDER_PURCHASE_INIT: 'ORDER_PURCHASE_INIT',
    ORDER_PURCHASE_INIT_API: 'ORDER_PURCHASE_INIT_API',
    ORDER_PURCHASE_SUCCESS: 'ORDER_PURCHASE_SUCCESS',
    ORDER_PURCHASE_ERR: 'ORDER_PURCHASE_ERR'
}

//Action creators
export const onOrderBurgerInit = (order) => ({ type: actionTypes.ORDER_PURCHASE_INIT });
export const onOrderBurgerError = (error) => ({ type: actionTypes.ORDER_PURCHASE_ERR, error });

//API Action creators
export const onOrderBurgerInitAPI = (order) => ({ type: actionTypes.ORDER_PURCHASE_INIT_API });
export const onOrderBurgerDoneAPI = (orderId, order) => ({
    type: actionTypes.ORDER_PURCHASE_SUCCESS,
    orderId,
    order
});
export const onOrderBurgerAPI = (order) => async (dispatch) => {
    dispatch(onOrderBurgerInitAPI());
    const response = burgerAPI.post('/orders.json', order);
    const orderId = response.data;
    dispatch(onOrderBurgerDoneAPI(orderId, order));

//         .then((response => {
//             const orderId = response.data;
//             dispatch(onOrderBurgerDoneAPI(orderId, order));
//         }))
//         .catch((error) => {
//             dispatch(onOrderBurgerError(error));
//         });
//     return call;
}


//Reducer Model
const inistialState = {
    orders: [],
    isLoading: false,
    isPurchased: false
};

//Reducer
export default (state = inistialState, action) => {
    switch (action.type) {

        case actionTypes.ORDER_PURCHASE_INIT:
            return {
                ...state,
                isPurchased: false
            }

        case actionTypes.ORDER_PURCHASE_INIT_API:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.ORDER_PURCHASE_SUCCESS:
            const newOrder = {
                id: action.orderId,
                ...action.order
            }

           return {
               ...state,
               isLoading: false,
               isPurchased: true,
               orders: [...state.orders, newOrder]
           }

        case actionTypes.ORDER_PURCHASE_ERR:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}