import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const userClaims = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      currentUser
        .getIdTokenResult()
        .then((idToken) => {
          userClaims.current = idToken.claims;
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return loading ? (
          <div className="center">
            <CircularProgress />
          </div>
        ) : currentUser && userClaims.current && userClaims.current.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
