import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Payment.scss";

class Payment extends Component {
    
    render() {
        return (

            <div>
                <Row>
                    <Col className="lg-4">
                        <h1>Make Payment</h1>
                    </Col>
                </Row>  
            </div>
        )
    }
}
export default Payment;