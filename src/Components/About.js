import React from "react";
import "./About.css";

class About extends React.Component {
  render() {
    return (
      <div className="about-class">
        <div className="jumbotron">
          <h1 className="display-4">About izi</h1>
          <p className="lead">
            izi is an online gifts store that was initiated in 2017. All the gifts at izi are handmade. If you are looking for a place to customize your gifts the way you want it, not the way you
            found it, then you have come to the right place.{" "}
          </p>
          <hr className="my-4" />
          <p className="end-jumbo">
            Thanks for your interest in izi. <i className="far fa-heart"></i>
          </p>
        </div>
        <div
          className="mission-info"
          style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: ` url(${require("../assets/images/stars.png")})` }}
        >
          <div className="mission-or-vision">
            <h1>Mission</h1>
            <p>vdhv ghdvsg hvdsh hellodw jbhdcshe bdsjhve jvdhve jvev hfew jhfvewh efwh hwefv hewfh</p>
          </div>
          <div className="mission-or-vision">
            <h1>Vision</h1>
            <p>vdhv ghdvsg hvdsh hellodw jbhdcshe bdsjhve jvdhve jvev hfew jhfvewh efwh hwefv hewfh</p>
          </div>
        </div>
        <div className="founder-info">
          <div>
            <h1>
              <i className="fas fa-user-tag"></i> Founder
            </h1>
            <p>
              <span>Aalaa Mohamed</span> A graphic Designer and Video Animator
            </p>
            {/* <p>
              "I have always liked making handmade stuff, and I'd always gift them to my close friends and siblings. I wanted to express how much they are special and mean to me through these gifts.
              They are the ones who encouraged me to begin making things in the first place, and I have learnt that there is no such thing as waiting for the right time. The right time comes whenever
              you decide to begin, so begin."
            </p> */}
          </div>
          <img src={require("../assets/images/founder.jpg")} alt="founder"></img>
        </div>
        <div className="contact-info">
          <h1>
            <i className="far fa-id-card"></i> Contact us
          </h1>
          <p>
            <i className="fas fa-phone-alt"></i>
            <i className="fab fa-whatsapp"></i>+201101038345
          </p>
          <p>
            <i className="fab fa-facebook-f"></i>
            https://www.facebook.com/izi.handmade
          </p>
          <p>
            <i className="fab fa-instagram"></i>
            https://www.instagram.com/izi.handmade
          </p>
        </div>
      </div>
    );
  }
}

export default About;
