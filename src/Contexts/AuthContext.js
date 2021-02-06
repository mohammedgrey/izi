import { CircularProgress } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import firebase, { auth } from "../firebase";
import { removeToken, setToken } from "../utils/tokencookie";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return auth.signInWithPopup(provider);
  }
  function facebookSignin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    return auth.signInWithPopup(provider);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        user
          .getIdToken()
          .then((idToken) => {
            setToken(idToken);
          })
          .catch(console.log);
      } else removeToken();
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    googleSignin,
    facebookSignin,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="center">
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
