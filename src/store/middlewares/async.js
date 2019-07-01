export const async = ({ dispatch }) => next => action => {
  /**
   * check to seeif the action has a
   * promise on it's'payload' property.
   * If it does, then wait for it to resolve
   * if it doesn't, then send the action on to the
   * next middleware
   * */

  if (!action.payload || !action.payload.then) {
    return next(action);
  }
  /**
   * We want to wait for the promise to resolve
   * (get its data) and create new action
   * with that data and dispatch it
   */
  action.payload.then(response => {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
