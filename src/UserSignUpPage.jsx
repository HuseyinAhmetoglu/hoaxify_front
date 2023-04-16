import axios from "axios";
import React, { useState } from "react";
import "./bootstrap-override.scss";

function UserSignUpPage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangeDisplayName = (event) => {
    setDisplayName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const onClickSignUp = (event) => {
    event.preventDefault();
    const body = {
      username,
      displayName,
      password,
    };
    axios.post("/api/1.0/users", body);
  };

  return (
    <div className="container">
      <h1 className="text-center">User Sign Up</h1>
      <form>
        <div className="form-group m-3">
          <label>Username</label>
          <input className="form-control" onChange={onChangeUsername}></input>
        </div>
        <div className="form-group m-3">
          <label>Display Name</label>
          <input
            className="form-control"
            onChange={onChangeDisplayName}
          ></input>
        </div>
        <div className="form-group m-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            onChange={onChangePassword}
          ></input>
        </div>
        <div className="form-group m-3">
          <label>Password Repeat</label>
          <input
            className="form-control"
            type="password"
            onChange={onChangePasswordRepeat}
          ></input>
        </div>
        <div className="text-center m-3">
          <button className="btn btn-primary" onClick={onClickSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSignUpPage;
