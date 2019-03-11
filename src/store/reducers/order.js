// API
import { burgerAPI } from '../../services/api/index';

//Types
export const actionTypes = {
    ORDER_PURCHASE_SUCCESS: 'ORDER_PURCHASE_SUCCESS',
    ORDER_PURCHASE_ERR: 'ORDER_PURCHASE_ERR'
}

//Action creators
export const onOrderBurger = (orderId, order) => ({
    type: actionTypes.ORDER_PURCHASE_SUCCESS,
    orderId,
    order
});

export const onOrderBurgerError = (error) => ({ type: actionTypes.ORDER_PURCHASE_ERR, error });

export const onOrderBurgerAPI = (order) => async (dispatch) => {
    const call = await burgerAPI
        .post('/orders.json', order)
        .then((response => {
            const orderId = response.data;
            dispatch(onOrderBurger(orderId, order));
        }))
        .catch((error) => {
            dispatch(onOrderBurgerError(error));
        });

    return call;
}


//Reducer Model
const inistialState = {
};

//Reducer
export default (state = inistialState, action) => {
    return state
}