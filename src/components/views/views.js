import _ from 'lodash';
import withAsync from '../hoc/withAsync/withAsync';

const load = (name) => withAsync(
    () => import(`../../components/views/${_.camelCase(name)}/${name}`)
)(name);

export const SharedLayout = load('SharedLayout');
export const BurgerBuilder = load('BurgerBuilder');
export const Checkout = load('Checkout');
export const Orders = load('Orders');