import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Scan.scss";

class Scan extends Component {
    
    render() {
        return (

            <div>
                <Row>
                    <Col className="lg-4">
                        <h1>Scan QR Code</h1>
                    </Col>
                </Row>  
            </div>
        )
    }
}
export default Scan;