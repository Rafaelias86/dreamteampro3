import React, { Component } from "react";
//import { Button } from "reactstrap";
import API from "../../utils/API";
import Weather from "../../components/Weather/Weather";
import Clock from "../../components/Clock/Clock";
import GoogleMaps from "../../components/GoogleMap/GoogleMap";
import "./Home.scss";

class Home extends Component {
  state = {
    loggedIn: false,
    note: ""
  };

  componentDidMount() {
    this.loggedIn();
  }

  loggedIn = () => {
    API.isLoggedIn()
      .then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="homeBox">
        <div className="row1">
          <Clock />
          <Weather />
        </div>
        <GoogleMaps />
        {/* <img id="homeIcon" src="./assets/images/ferrari-bg.jpeg" alt="homelogo" width="100%" height="250%" /> */}
      </div>
    );
  }
}

export default Home;
