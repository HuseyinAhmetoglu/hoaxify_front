// Bu dosyaya REDUX tan dolayı gerek kalmadı!

import React, { useState, createContext, useEffect } from "react";
import SecureLS from "secure-ls";

export const Authentication = createContext({
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
  onLoginSuccess: (authState) => {},
  onLogoutSuccess: () => {},
});

function AuthenticationContext({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [displayName, setDisplayName] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const secureLs = new SecureLS();

  useEffect(() => {
    const hoaxAuth = secureLs.get("hoax-auth");

    if (hoaxAuth) {
      setIsLoggedIn(hoaxAuth.isLoggedIn);
      setUsername(hoaxAuth.username);
      setDisplayName(hoaxAuth.displayName);
      setImage(hoaxAuth.image);
      setPassword(hoaxAuth.password);
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
    secureLs.set("hoax-auth", state);
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUsername(undefined);
    setDisplayName(undefined);
    setImage(undefined);
    setPassword(undefined);
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
