// API
import { burgerAPI } from '../../services/api/index';

//Types
export const actionTypes = {
    ORDER_PURCHASE_INIT: 'ORDER_PURCHASE_INIT',
    ORDER_PURCHASE_SUCCESS: 'ORDER_PURCHASE_SUCCESS',
    ORDER_PURCHASE_ERR: 'ORDER_PURCHASE_ERR'
}

//Action creators
export const onOrderBurgerInit = (order) => ({ type: actionTypes.ORDER_PURCHASE });

export const onOrderBurgerDone = (orderId, order) => ({
    type: actionTypes.ORDER_PURCHASE_SUCCESS,
    orderId,
    order
});

export const onOrderBurgerError = (error) => ({ type: actionTypes.ORDER_PURCHASE_ERR, error });

export const onOrderBurgerAPI = (order) => async (dispatch) => {
    dispatch(onOrderBurgerInit);
    const response = burgerAPI.post('/orders.json', order);
    const orderId = response.data;
    dispatch(onOrderBurgerDone(orderId, order));

//         .then((response => {
//             const orderId = response.data;
//             dispatch(onOrderBurgerDone(orderId, order));
//         }))
//         .catch((error) => {
//             dispatch(onOrderBurgerError(error));
//         });
//     return call;
}


//Reducer Model
const inistialState = {
    orders: [],
    loading: false
};

//Reducer
export default (state = inistialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PURCHASE_INIT:
            return {
                ...state,
                loading: true
            }

        case actionTypes.ORDER_PURCHASE_SUCCESS:
            const newOrder = {
                id: action.orderId,
                ...action.order
            }

           return {
               ...state,
               loading: false,
               orders: [...state.orders, newOrder]
           }

        case actionTypes.ORDER_PURCHASE_ERR:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}