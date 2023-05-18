import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const loggedInState = {
  isLoggedIn: true,
  username: "userr",
  displayName: "dispuserr",
  image: null,
  password: "P4ssword",
};

const configureStore = () => {
  return createStore(authReducer, loggedInState);
};

export default configureStore