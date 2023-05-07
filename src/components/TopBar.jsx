import React from "react";
import { useState } from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";

function TopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("user1");

  let links = (
    <ul className="navbar-nav">
      <li>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav">
        <li>
          <Link className="nav-link" to={`/user/${username}`}>
            {username}
          </Link>
        </li>
        <li className="nav-link">logout</li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm bg-body-tertiary mb-3">
      <nav className="navbar container navbar-expand">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} style={{ marginRight: 10 }}></img>
            Hoaxify
          </Link>
          {links}
        </div>
      </nav>
    </div>
  );
}

export default TopBar;
