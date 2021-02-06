import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import About from "./Components/About";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import AdminRoute from "./Components/AdminRoute";
import PrivateRoute from "./Components/PrivateRoute";
import AddProduct from "./Components/AddProduct";
import FavoritesPage from "./Components/FavoritesPage";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="contents">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop/" component={Shop} />
          <Route path="/about/" component={About} />
          <Route path="/login" component={Login}></Route>
          <AdminRoute path="/addproduct" component={AddProduct}></AdminRoute>
          <PrivateRoute path="/favorites" component={FavoritesPage}></PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
