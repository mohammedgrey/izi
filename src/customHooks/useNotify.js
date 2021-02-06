import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export default function useNotify() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Operation Successful");
  const [type, setType] = useState("success");
  const notify = (message, type) => {
    // type--> success or error
    // message --> any valid string
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setOpen(true);
    }, 200);

    setTimeout(() => {
      setOpen(false);
    }, 2200);
  };
  const Notify = () => {
    return (
      <Snackbar style={{ zIndex: "100000" }} open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert variant="filled" severity={type}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  return { notify, Notify };
}
