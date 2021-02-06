import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Redirect } from "react-router-dom";
import "./Login.css";
import { signUpToTheServer } from "../API/users";
import { CircularProgress } from "@material-ui/core";
import useNotify from "../customHooks/useNotify";
import LoginContents from "./LoginContents";

export default function Login() {
  const { googleSignin, facebookSignin, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { notify, Notify } = useNotify();

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await googleSignin();
      var user = result.user;
      await signUpToTheServer({ uid: user.uid, email: user.email });
    } catch (error) {
      notify("Connection lost. Please try again!", "error");
    }
    if (_isMounted.current) {
      // Check if the component is mounted before setting the state again
      setLoading(false);
    }
  };
  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await facebookSignin();
      const user = result.user;
      await signUpToTheServer({ uid: user.uid, email: user.email });
    } catch (error) {
      console.log(error);
      notify("Connection lost. Please try again!", "error");
    }
    if (_isMounted.current) {
      // Check if the component is mounted before setting the state again
      setLoading(false);
    }
  };
  //For cleaning up
  const _isMounted = useRef(true); // Initial value _isMounted = true
  useEffect(() => {
    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, []);

  return (
    <div>
      {currentUser ? (
        <Redirect to="/shop/" />
      ) : loading ? (
        <div className="center">
          <CircularProgress />
        </div>
      ) : (
        <div className="login-page" style={{ marginTop: "120px", marginBottom: "150px" }}>
          <LoginContents signInWithFacebook={signInWithFacebook} signInWithGoogle={signInWithGoogle} />
        </div>
      )}
      <Notify />
    </div>
  );
}
