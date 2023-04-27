import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const buttonEnabled = username && password;

  const onChangeUsername = (event) => {
    setError(null);
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setError(null);
    setPassword(event.target.value);
  };

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };
    setError(null);
    setPendingApiCall(true);

    try {
      await login(creds);
      setPendingApiCall(false);
    } catch (apiError) {
      setError(apiError.response.data.message);
      setPendingApiCall(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Giriş</h1>
      <form>
        <Input label="Kullanıcı Adı" onChange={onChangeUsername}></Input>
        <Input
          label="Parola"
          onChange={onChangePassword}
          type="password"
        ></Input>
        {error && <div className="alert alert-danger">{error}</div>}
        <ButtonWithProgress
          onClick={onClickLogin}
          text="Giriş Yap"
          disabled={!buttonEnabled || pendingApiCall}
          pendingApiCall={pendingApiCall}
        ></ButtonWithProgress>
      </form>
    </div>
  );
}

export default LoginPage;
