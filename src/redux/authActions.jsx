import { login, signUp } from "../api/apiCalls";
import * as ACTIONS from "./constants";

export const logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authData) => {
  return {
    type: ACTIONS.LOGOIN_SUCCESS,
    payload: authData,
  };
};

export const loginHandler = (credentials) => {
  return async function (dispatch) {
    const response = await login(credentials);
    const authState = {
      ...response.data,
      password: credentials.password,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};

export const signUpHandler = (user) => {
  return async function (dispatch) {
    const response = await signUp(user);
    await dispatch(loginHandler(user));
    return response;
  };
};
