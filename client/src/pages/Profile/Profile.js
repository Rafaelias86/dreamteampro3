import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Vehicle from "../../components/Vehicle";
import API from "../../utils/API";
// import "./Auth.scss";

class Profile extends Component {

  
    state = {
        locname: "",
        poc: "",
        pocphone: "",
        vehicleinfo: "",
        spaces: "",
        pickup: ""
      }
  

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleVehicleUpload = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.vehicleUpload({
        locname: this.state.locname,
        poc: this.state.poc,
        pocphone: this.state.pocphone,
        vehicleinfo: this.state.vehicleinfo,
        spaces: this.state.spaces,
        pickup: this.state.pickup,
      }).then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/vehicle';
        } else {
          console.log("something went wrong :(")
          console.log(user.data);
          this.setState({
            message: user.data
          })
        }
      });
    }
  }

  render() {
    return (
      <div className="profilePage">
        {(this.props.action === "login") ? (
          <Login
            username={this.state.username}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        ) : (
            <Vehicle
              locname={this.state.locname}
              poc={this.state.poc}
              pocphone={this.state.pocphone}
              vehicleinfo={this.state.vehicleinfo}
              spaces={this.state.spaces}
              pickup={this.state.pickup}
              handleInputChange={this.handleInputChange}
              message={this.state.message}
            />
          )}
      </div>
    )
  }
}

export default Profile;