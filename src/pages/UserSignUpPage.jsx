import axios from "axios";
import React, { useState } from "react";
import "../bootstrap-override.scss";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";

function UserSignUpPage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});

  const onChangeUsername = (event) => {
    errors.username = undefined;
    setUsername(event.target.value);
  };
  const onChangeDisplayName = (event) => {
    errors.displayName = undefined;
    setDisplayName(event.target.value);
  };
  const onChangePassword = (event) => {
    errors.password = undefined;
    setPassword(event.target.value);
    if (event.target.value != passwordRepeat) {
      errors.passwordRepeat = "Password mismatch!";
    } else {
      errors.passwordRepeat = undefined;
    }
  };
  const onChangePasswordRepeat = (event) => {
    errors.passwordRepeat = undefined;
    setPasswordRepeat(event.target.value);
    if (event.target.value != password) {
      errors.passwordRepeat = "Password mismatch!";
    } else {
      errors.passwordRepeat = undefined;
    }
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    const body = {
      username,
      displayName,
      password,
    };
    setPendingApiCall(true);

    try {
      const response = await signUp(body);
      setPendingApiCall(false);
    } catch (error) {
      setErrors(error.response.data.validationErrors);
      setPendingApiCall(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Kayıt Ol</h1>
      <form>
        <Input
          label="Kullanıcı Adı"
          error={errors.username}
          onChange={onChangeUsername}
        ></Input>
        <Input
          label="Tercih edilen isim"
          error={errors.displayName}
          onChange={onChangeDisplayName}
        ></Input>
        <Input
          label="Parola"
          error={errors.password}
          onChange={onChangePassword}
          type={"password"}
        ></Input>
        <Input
          label="Parolayı Tekrarla"
          error={errors.passwordRepeat}
          onChange={onChangePasswordRepeat}
          type={"password"}
        ></Input>

        <div className="text-center m-3">
          <button
            className="btn btn-primary"
            onClick={onClickSignUp}
            disabled={pendingApiCall || errors.passwordRepeat != undefined}
          >
            {pendingApiCall && (
              <span className="spinner-border spinner-border-sm"></span>
            )}{" "}
            Kayıt ol
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSignUpPage;
