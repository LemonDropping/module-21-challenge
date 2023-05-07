import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { LOGOUT_USER } from "../utils/mutations";

function Navbar() {
  const { loading, data } = useQuery(GET_ME);
  const [logout] = useMutation(LOGOUT_USER);

  const handleLogout = () => {
    logout();
    Auth.logout();
  };

  const authLink = Auth.loggedIn() ? (
    <>
      <li className="nav-item">
        <Link to="/me" className="nav-link">
          {data?.me.username}'s Profile
        </Link>
      </li>
      <li className="nav-item">
        <a href="/" className="nav-link" onClick={handleLogout}>
          Logout
        </a>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Book Search Engine
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">{!loading && authLink}</ul>
      </div>
    </nav>
  );
}

export default Navbar;
