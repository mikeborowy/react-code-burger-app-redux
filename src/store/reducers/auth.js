import { authAPI } from '../../services/api/auth';

export const actionTypes = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAIL: 'AUTH_FAIL',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  SET_AUTH_REDIRECT_PATH: 'SET_AUTH_REDIRECT_PATH',
};

/** Action Creators */
export const onAuthStart = () => ({ type: actionTypes.AUTH_START });
export const onAuthSuccess = (authData) => ({ type: actionTypes.AUTH_SUCCESS, authData });
export const onAuthFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });
export const onAuthLogout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const onLogout = () => (dispatch) => {
  clearStorage();
  dispatch(onAuthLogout());
};
export const onCheckAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(onLogout());
  }, expirationTime * 1000);
};

export const onSetAuthRedirectPath = (path) => ({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path });
export const onAuthCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(onLogout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(onAuthSuccess(token, userId));
        dispatch(onCheckAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

/** API Action Creators */
export const onAuthStartAPI = (email, password, isSignup) => async (dispatch) => {
  dispatch(onAuthStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await (isSignup ? authAPI.signUp(authData) : authAPI.signIn(authData));
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    const params = {
      token: response.data.idToken,
      expirationDate,
      userId: response.data.email,
    };
    setStorage(params);
    dispatch(onAuthSuccess(response.data));
    dispatch(onCheckAuthTimeout(response.data.expiresIn));
  } catch (error) {
    dispatch(onAuthFail(error));
  }
};

/** Reducer */
const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  authRedirectPath: '/',
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.authData.email,
        token: action.authData.idToken,
        error: false,
        isLoading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
        error: false,
        isLoading: false,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};

/** Helpers */
function setStorage(params) {
  localStorage.setItem('token', params.token);
  localStorage.setItem('expirationDate', params.expirationDate);
  localStorage.setItem('userId', params.userId);
}

function clearStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
}
