import React from "react";

export default function LoginContents({ signInWithGoogle, signInWithFacebook }) {
  return (
    <>
      <button className="login-with-google" onClick={signInWithGoogle}>
        <img src={require(`../assets/images/googleLogo.png`)} alt="broken"></img> Login with
        <span style={{ color: "rgb(66,133,244)" }}> G</span>
        <span style={{ color: "rgb(234,67,53)" }}>o</span>
        <span style={{ color: "rgb(251,188,5)" }}>o</span>
        <span style={{ color: "rgb(66,133,244)" }}>g</span>
        <span style={{ color: "rgb(52,168,83)" }}>l</span>
        <span style={{ color: "rgb(234,67,53)" }}>e</span>
      </button>
      <button className="login-with-facebook" onClick={signInWithFacebook}>
        <i className="fab fa-facebook-f"></i> Login with <span>Facebook</span>
      </button>
    </>
  );
}
