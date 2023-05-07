import React, { useState, createContext } from "react";

export const Authentication = createContext();

function AuthenticationContext({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState(undefined);
  const [displayName, setDisplayName] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const onLoginSuccess = (authState) => {
    setUsername(authState.username);
    setDisplayName(authState.displayName);
    setImage(authState.image);
    setPassword(authState.password);
    setIsLoggedIn(true);
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUsername(undefined);
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
