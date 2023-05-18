import React from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../redux/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };
  const { isLoggedIn, username } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
      username: store.username,
    };
  });

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
        <li
          className="nav-link"
          onClick={onLogoutSuccess}
          style={{ cursor: "pointer" }}
        >
          logout
        </li>
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
