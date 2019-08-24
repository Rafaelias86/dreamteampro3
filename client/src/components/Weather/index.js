import React, { Component } from "react";
// require('dotenv').config();
import "./Weather";

import Clock from "../Clock";
import Weather from "./Weather";
// import CurrentLocation from "./Maps";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row1">
          <Clock />
          <Weather />
        </div>
      </div>
    );
  }
}

export default App;
