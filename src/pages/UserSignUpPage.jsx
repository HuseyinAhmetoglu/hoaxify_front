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
  };
  const onChangePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
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
      <h1 className="text-center">User Sign Up</h1>
      <form>
        <Input
          label="Username"
          error={errors.username}
          onChange={onChangeUsername}
        ></Input>
        <Input
          label="Display Name"
          error={errors.displayName}
          onChange={onChangeDisplayName}
        ></Input>
        <Input
          label="Password"
          error={errors.password}
          onChange={onChangePassword}
          type={"password"}
        ></Input>
        <div className="form-group m-3">
          <label>Password Repeat</label>
          <input
            className="form-control"
            type="password"
            onChange={onChangePasswordRepeat}
          ></input>
        </div>
        <div className="text-center m-3">
          <button
            className="btn btn-primary"
            onClick={onClickSignUp}
            disabled={pendingApiCall}
          >
            {pendingApiCall && (
              <span className="spinner-border spinner-border-sm"></span>
            )}{" "}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSignUpPage;
