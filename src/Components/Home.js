import React from "react";
import "./Home.css";
import homeImage from "../assets/images/homebackground.jpg";

class Home extends React.Component {
  render() {
    return (
      <div className="home-class">
        <img src={homeImage} alt="broken"></img>

        <div className="welcome-text">
          <h1>Welcome to izi | Handmade Gifts</h1>
          <p>
            Let your uniqueness shine through your style and take your elegance
            to the next level.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
