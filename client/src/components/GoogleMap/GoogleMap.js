import React from "react";
// import GoogleMaps from "google-maps-react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class GoogleMaps extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDTw3fIaVjed9M-mro7Fwl-sl-jg2RjINc"
})(GoogleMaps);
