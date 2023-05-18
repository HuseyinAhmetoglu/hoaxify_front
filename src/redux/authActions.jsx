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
