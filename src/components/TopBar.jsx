import React from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="shadow-sm bg-body-tertiary mb-3">
      <nav className="navbar container navbar-expand">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} style={{ marginRight: 10 }}></img>
            Hoaxify
          </Link>
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
        </div>
      </nav>
    </div>
  );
}

export default TopBar;
