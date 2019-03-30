// API
import { burgerAPI } from '../../services/api/burger';

//Types
export const actionTypes = {
    ORDER_INIT: 'ORDER_INIT',
    ORDER_LOADING: 'ORDER_LOADING',
    ORDER_SET: 'ORDER_SET',
    ORDER_ERR: 'ORDER_ERR',
    ORDERS_INIT: 'ORDERS_INIT',
    ORDERS_LOADING: 'ORDERS_LOADING',
    ORDERS_SET: 'ORDERS_SET',
    ORDERS_ERR: 'ORDERS_ERR'
}

//Action creators
export const onOrderBurgerLoading = () => ({ type: actionTypes.ORDER_LOADING });
export const onOrderBurgerInit = () => ({ type: actionTypes.ORDER_INIT });
export const onOrderBurgerError = (error) => ({ type: actionTypes.ORDER_ERR, error });
export const onOrderBurgerSet = (orderId, order) => ({
    type: actionTypes.ORDER_SET,
    orderId,
    order
});

export const onOrdersLoading = () => ({ type: actionTypes.ORDERS_LOADING });
export const onOrdersInit = () => ({ type: actionTypes.ORDERS_INIT });
export const onOrdersError = (error) => ({ type: actionTypes.ORDERS_ERR, error });
export const onOrdersSet = (orders) => ({ type: actionTypes.ORDERS_SET, orders });


//API Action creators
export const onOrderBurgerSetAPI = (order, token) => async (dispatch) => {
    dispatch(onOrderBurgerLoading());
    try {
        const response = await burgerAPI.setOrder(order, token);
        const orderId = response.data;
        dispatch(onOrderBurgerSet(orderId, order));
   } catch (error) {
        dispatch(onOrdersError(error));
   }
}

export const onOrdersGetAPI = (token) => async (dispatch) => {
    dispatch(onOrdersLoading());
    try {
        const response = await burgerAPI.getOrders(token);
        const orders = [];
        for (let key in response.data) {
            orders.push({
                ...response.data[key],
                id: key
            });
        }
        dispatch(onOrdersSet(orders));
    } catch (error) {
        dispatch(onOrdersError(error));
    }
};

//Reducer Model
const inistialState = {
    token: null,
    orders: [],
    isLoading: false,
    isPurchased: false
};

//Reducer
export default (state = inistialState, action) => {
    switch (action.type) {

        case actionTypes.ORDER_INIT:
            return {
                ...state,
                isPurchased: false
            }

        case actionTypes.ORDER_INIT_API:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.ORDER_SET:
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

        case actionTypes.ORDER_ERR:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.ORDERS_LOADING:
            return {
                ...state,
                isPurchased: true
            }

        case actionTypes.ORDERS_SET:
            return {
                ...state,
                orders: action.orders
            }

        case actionTypes.ORDERS_ERR:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}