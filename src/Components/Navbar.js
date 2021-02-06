import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.jpg";

const Navbar = () => (
  <div className="nav-class">
    <div className="nav-left">
      <NavLink to="/shop/" className="nav-link">
        {" "}
        <i className="fas fa-circle"></i> Shop <i className="fas fa-circle"></i>
      </NavLink>
    </div>
    <div className="nav-right">
      <NavLink to="/about/" className="nav-link">
        {" "}
        <i className="fas fa-circle"></i> About{" "}
        <i className="fas fa-circle"></i>
      </NavLink>
    </div>
    <Link to="/" className="navbar-brand logo-top">
      {" "}
      <img className="logo-img" src={logo} alt="logo" />
    </Link>
  </div>
);

export default Navbar;
