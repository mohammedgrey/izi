import React from 'react';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import About from "./Components/About";
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    
    <div className="app">
      <Navbar/>

      <div className="contents">
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route  path="/shop/" component={Shop}/>
          <Route  path="/about/" component={About}/>
      </Switch>
      </div>


      <Footer/>
    </div>
    
  );
}

export default App;
