import React, { useState, createContext, useEffect } from "react";

export const Authentication = createContext();

function AuthenticationContext({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [displayName, setDisplayName] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  useEffect(() => {
    const hoaxAuth = localStorage.getItem("hoax-auth");

    if (hoaxAuth) {
      try {
        const hoaxAuthParse = JSON.parse(hoaxAuth);
        setIsLoggedIn(hoaxAuthParse.isLoggedIn);
        setUsername(hoaxAuthParse.username);
        setDisplayName(hoaxAuthParse.displayName);
        setImage(hoaxAuthParse.image);
        setPassword(hoaxAuthParse.password);
      } catch (error) {}
    }
  });

  const onLoginSuccess = (authState) => {
    setIsLoggedIn(true);
    setUsername(authState.username);
    setDisplayName(authState.displayName);
    setImage(authState.image);
    setPassword(authState.password);

    const state = {
      isLoggedIn: true,
      username: authState.username,
      displayName: authState.displayName,
      image: authState.image,
      password: authState.password,
    };
    localStorage.setItem("hoax-auth", JSON.stringify(state));
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUsername(undefined);
    setDisplayName(undefined);
    setImage(undefined);
    setPassword(undefined);
    const state = {
      isLoggedIn: false,
      username: undefined,
      displayName: undefined,
      image: undefined,
      password: undefined,
    };
    localStorage.removeItem("hoax-auth");
  };

  const shared = {
    isLoggedIn,
    username,
    displayName,
    image,
    password,
    onLoginSuccess,
    onLogoutSuccess,
  };

  return (
    <Authentication.Provider value={shared}>{children}</Authentication.Provider>
  );
}

export default AuthenticationContext;
