import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import "./Footer.css";

const Footer = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const logTheUserOut = async () => {
    setLoading(true);
    try {
      await logout();
    } catch {
      console.log("logout failed!");
    }
    setLoading(false);
  };
  return (
    <div className="footer-class">
      {currentUser ? (
        <div className="logged-in-info-or-out">
          <img src={currentUser.photoURL} alt="broken" />
          <div>
            <p>{currentUser.displayName}</p>
            <button onClick={logTheUserOut} disabled={loading}>
              LOG OUT
            </button>
          </div>
        </div>
      ) : (
        <div className="logged-in-info-or-out">
          <Link to="/login">LOG IN</Link>
        </div>
      )}

      <div className="social-media-icons-new">
        <p>Follow us</p>
        <a href="https://www.facebook.com/izi.handmade/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>

        <a href="https://www.instagram.com/izi.handmade/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
