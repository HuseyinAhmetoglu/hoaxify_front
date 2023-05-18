import React, { useState } from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useEffect } from "react";

function UserSignUpPage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    errors.username = undefined;
  }, [username]);
  useEffect(() => {
    errors.displayName = undefined;
  }, [displayName]);
  useEffect(() => {
    errors.password = undefined;
  }, [password]);
  useEffect(() => {
    errors.passwordRepeat = undefined;
  }, [passwordRepeat]);

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

  if (password != passwordRepeat) {
    errors.passwordRepeat = "Parola uyuşmuyor!";
  }

  return (
    <div className="container">
      <h1 className="text-center">Kayıt Ol</h1>
      <form>
        <Input
          label="Kullanıcı Adı"
          error={errors.username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></Input>
        <Input
          label="Tercih edilen isim"
          error={errors.displayName}
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        ></Input>
        <Input
          label="Parola"
          error={errors.password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type={"password"}
        ></Input>
        <Input
          label="Parolayı Tekrarla"
          error={errors.passwordRepeat}
          onChange={(event) => {
            setPasswordRepeat(event.target.value);
          }}
          type={"password"}
        ></Input>
        <ButtonWithProgress
          onClick={onClickSignUp}
          disabled={pendingApiCall || errors.passwordRepeat != undefined}
          pendingApiCall={pendingApiCall}
          text="Kayıt Ol"
        ></ButtonWithProgress>
      </form>
    </div>
  );
}

export default UserSignUpPage;
