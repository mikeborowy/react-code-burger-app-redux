import axios from 'axios';

const GOOGLE = {
  KEY: `AIzaSyB0W8KF7UKhGF_-aRvWpd4UNigLi0AH9Bs`,
  SIGN_UP: `signupNewUser`,
  SING_IN: `verifyPassword`,
};

const google = axios.create({
  baseURL: 'https://www.googleapis.com/',
});

const signUp = (authData) => {
  const action = `identitytoolkit/v3/relyingparty/${GOOGLE.SIGN_UP}?key=${GOOGLE.KEY}`;
  return google.post(action, authData);
};

const signIn = (authData) => {
  const action = `identitytoolkit/v3/relyingparty/${GOOGLE.SING_IN}?key=${GOOGLE.KEY}`;
  return google.post(action, authData);
};

export const authAPI = {
  google,
  signIn,
  signUp,
};
