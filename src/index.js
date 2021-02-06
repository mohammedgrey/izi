import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { DialogProvider } from "muibox";
import theme from "./utils/Theme";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </DialogProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
