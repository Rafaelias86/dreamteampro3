import React, { Component } from "react";
//import { Button } from "reactstrap";
import API from "../../utils/API";
import Weather from "../../components/Weather/Weather";
import Clock from "../../components/Clock/Clock";
import GoogleMaps from "../../components/GoogleMap/GoogleMap";
import "./Home.scss";
import Weather from "../../components/Weather/Weather";
import Clock from "../../components/Clock/Clock";

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
<<<<<<< HEAD

      <div className="container homeBox">
        <div className=" row d-flex justify-content-center">
          {/* <div className="col-12 bg-light">
          <Clock />
          </div> */}
          <div className="col-lg-6 p-2 d-flex justify-content-center">
           
          <Weather />
          
          </div>
        </div>

          <div className="row text-center justify-content-center">
            <img className="my-3 center-block" alt="homelogo" src="./assets/images/ez-valet-logo3.jpg" width="270px" height="250px" />
          </div>
          <div className="row text-center justify-content-center my-2">
            <h5 className="text-center text-primary mx-2 p-2 font-weight-bold">Fully Ticketless Valet Solution</h5> 
          </div>

          <div className="row text-center justify-content-center"> 
            <button type="button" class="btn btn-info">Terms & Conditions</button>
            <button type="button" class="btn btn-success">Privacy Policy</button>
          </div>

      <br/>
      <div className="row text-center justify-content-center">
            <p className="navbar-text my-2 my-lg-0 font-weight-bold">
                Copyright  © Ultimate Software Solutions Inc. 2019
            </p>     
=======
      <div className="homeBox">
        <div className="row1">
          <Clock />
          <Weather />
        </div>
        <GoogleMaps />
        {/* <img id="homeIcon" src="./assets/images/ferrari-bg.jpeg" alt="homelogo" width="100%" height="250%" /> */}
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
      </div>

      <br/><br/><br/><br/><br/>
      </div>

    );
  }
}

export default Home;
