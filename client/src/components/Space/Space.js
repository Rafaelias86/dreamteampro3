import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Space.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";


class Space extends Component {
    
    state = {
        loggedIn: false,
        user: null,
        
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });
        //console.log(this.props)
        }
    
    
    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <center>
                        <div>
                            <Row>
                                <Col className="lg-4">
                                    <h1>Available Space</h1>
                                </Col>
                            </Row>  
                        </div>
                    </center>
                ) :
                (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h4>please log in</h4>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color=".bg-success" block>Login</Button></Link>
                            </>
                        ) : (
                                <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading" />
                            )}
                    </div>
                )}
            </div>

        )
    }
}

export default Space;