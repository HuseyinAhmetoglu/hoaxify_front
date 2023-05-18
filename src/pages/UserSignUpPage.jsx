import React, { useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useNavigate } from "react-router";
import { signUpHandler } from "../redux/authActions";
import { useDispatch } from "react-redux";

function UserSignUpPage() {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });

  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = form;
    const body = {
      username,
      displayName,
      password,
    };
    setPendingApiCall(true);
    try {
      await dispatch(signUpHandler(body));
      setPendingApiCall(false);
      navigate("/");
    } catch (error) {
      setPendingApiCall(false);
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;
  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = "Parola uyuşmuyor!";
  }

  return (
    <div className="container">
      <h1 className="text-center">Kayıt Ol</h1>
      <form>
        <Input
          name="username"
          label="Kullanıcı Adı"
          error={usernameError}
          onChange={onChange}
        ></Input>
        <Input
          name="displayName"
          label="Tercih edilen isim"
          error={displayNameError}
          onChange={onChange}
        ></Input>
        <Input
          name="password"
          label="Parola"
          error={passwordError}
          onChange={onChange}
          type={"password"}
        ></Input>
        <Input
          name="passwordRepeat"
          label="Parolayı Tekrarla"
          error={passwordRepeatError}
          onChange={onChange}
          type={"password"}
        ></Input>
        <ButtonWithProgress
          onClick={onClickSignUp}
          disabled={pendingApiCall || passwordRepeatError != undefined}
          pendingApiCall={pendingApiCall}
          text="Kayıt Ol"
        ></ButtonWithProgress>
      </form>
    </div>
  );
}

export default UserSignUpPage;
