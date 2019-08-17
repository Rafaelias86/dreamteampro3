import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Retrieve.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";


class Retrieve extends Component {
 
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
                                <Col className="lg-12">
                                    <h1>Retrieve Vehicle</h1>
                                    <div className="my-4 d-flex justify-content-center">
                                    <FormGroup className="form-inline">
                                        <div className="form-group mr-2">
                                        <label for="find by" className=" font-weight-bold mx-2">Find by:</label>
                                        <select id="selectBy" className="custom-select form-group col-md-8" name="selectBy">
                                                <option selected>Cust_ID</option>
                                                <option >Name</option>
                                                <option >Phone</option>
                                                <option >Registration</option>
                                        </select>
                                        </div>
                                        <div className="form-group mr-2">
                                            <input type="value" class="form-control" id="inputvalue" placeholder="Value"/>
                                        </div>
                                        <button type="search" class="btn btn-primary">Search</button>
                                    </FormGroup>
                                    </div>
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
export default Retrieve;