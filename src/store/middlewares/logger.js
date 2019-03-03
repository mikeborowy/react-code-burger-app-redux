export default (store) => (next) => (action) => {
    let result;
    result = next(action);
    console.log('store logger', store.getState());
    return result;
};
