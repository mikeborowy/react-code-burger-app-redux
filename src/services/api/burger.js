import axios from 'axios';

const burger = axios.create({
  baseURL: 'https://react-burger-app-617db.firebaseio.com/'
});

const getIngredients = () => burger.get(`ingredients.json`);
const setOrder = (order, token) => burger.post(`/orders.json?auth=${token}`, order);
const getOrders = (token) => burger.get(`/orders.json?auth=${token}`);

export const burgerAPI = {
  burger,
  getIngredients,
  setOrder,
  getOrders
}