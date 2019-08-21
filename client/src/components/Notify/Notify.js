import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import moment from 'moment'
import "./Notify.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import SMSForm from './SMSForm';
require('dotenv').config();

class Notify extends Component {
    render() {
		return (
		  <div className="App">
			<header className="App-header">
			  {/* <img src={logo} className="App-logo" alt="logo" /> */}
	
			  <SMSForm />
			</header>
		  </div>
		);
	  }
}
export default Notify;