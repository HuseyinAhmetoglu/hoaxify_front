import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../redux/authActions";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };
    setError(undefined);
    setPendingApiCall(true);

    try {
      await dispatch(loginHandler(creds));
      setPendingApiCall(false);
      navigate("/");
    } catch (apiError) {
      setError(apiError.response.data.message);
      setPendingApiCall(false);
    }
  };

  const buttonEnabled = username && password;

  return (
    <div className="container">
      <h1 className="text-center">Giriş</h1>
      <form>
        <Input
          label="Kullanıcı Adı"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></Input>
        <Input
          label="Parola"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
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
