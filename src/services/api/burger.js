import axios from 'axios';

const burger = axios.create({
  baseURL: 'https://react-burger-app-617db.firebaseio.com/',
});

const getIngredients = () => burger.get(`ingredients.json`);
const setOrder = (order, token) => burger.post(`/orders.json?auth=${token}`, order);
const getOrders = (userId, token) => {
  return burger.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
};

export const burgerAPI = {
  burger,
  getIngredients,
  setOrder,
  getOrders,
};
