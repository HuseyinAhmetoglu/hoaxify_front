import React, { useEffect, useState, useContext } from "react";
import Input from "../components/Input";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginSuccess } from "../redux/authActions";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const buttonEnabled = username && password;

  const navigate = useNavigate();

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
      const response = await login(creds);
      setPendingApiCall(false);
      navigate("/");

      const authState = {
        ...response.data,
        password,
      };

      onLoginSuccess(authState);
    } catch (apiError) {
      setError(apiError.response.data.message);
      setPendingApiCall(false);
    }
  };

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

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: (authState) => {
      return dispatch(loginSuccess(authState));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
