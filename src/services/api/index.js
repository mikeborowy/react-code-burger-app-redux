import axios from 'axios';

export const burgerAPI = axios.create({
  baseURL: 'https://react-burger-app-617db.firebaseio.com/'
});