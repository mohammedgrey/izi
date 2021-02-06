import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import LoginContents from "./LoginContents";
import { signUpToTheServer } from "../API/users";
import { Button, CircularProgress } from "@material-ui/core";
import useNotify from "../customHooks/useNotify";
import { useAuth } from "../Contexts/AuthContext";

const LoginModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { currentUser, googleSignin, facebookSignin } = useAuth();
  const { notify, Notify } = useNotify();
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await googleSignin();
      var user = result.user;
      await signUpToTheServer({ uid: user.uid, email: user.email });
      props.onHide();
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
      props.onHide();
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
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static">
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">Please sign in first to add products to favorites!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-page" style={{ height: "200px" }}>
          {loading ? (
            <div className="center">
              <CircularProgress />
            </div>
          ) : currentUser ? (
            <div>Log out</div>
          ) : (
            <LoginContents signInWithFacebook={signInWithFacebook} signInWithGoogle={signInWithGoogle} />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" color="primary" disabled={loading} onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
      <Notify />
    </Modal>
  );
};

export default LoginModal;
