import React, { Component } from "react";
import QrReader from 'react-qr-reader'

import "./Scan.scss";

class Scan extends Component {
    
    constructor(props) {
		super(props);
		this.state = {
			delay: 300,
			result: "No result"
		};
		this.handleScan = this.handleScan.bind(this);
	}
	handleScan(data) {
		if (data && data !== this.state.result) {
			console.log('data', data);
			this.setState({
				result: data
			});
			const token = window.location.search.match(/\?userToken=(\S+)/)[1];

		fetch('https://tcc-restapi.herokuapp.com/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': token || null
			},
			body: JSON.stringify({
				url: data,
			})
		})
			.then((res) => {
				console.log('res', res);
				alert('Nota salva com sucesso!');
			})
			.catch(e => console.log(e));
		}
	}
	handleError(err) {
		console.error(err);
	}
	render() {
		return (
            <center>
			<div className="p-4">
				<QrReader
					delay={this.state.delay}
					onError={this.handleError}
					onScan={this.handleScan}
					style={{ width: "30%", height: "auto" }}
				/>
				<p className="p-1">{this.state.result}</p>
			</div>
            </center>
		);
	}
    }
     
export default Scan;