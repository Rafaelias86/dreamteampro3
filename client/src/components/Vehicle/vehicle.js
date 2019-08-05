import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Vehicle.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import Timer from "../Timer";
import { Table } from 'reactstrap';



class Vehicle extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true,
        vehicles: [],
        locname: "",
        poc: "",
        pocphone: "",
        vehicleinfo: "",
        spaces: "",
        comments: "",
        claimit: false
    }
    componentDidMount() {
        this.loading();
        this.loadVehicles();
        // this.loadClaimIt();
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
        console.log(this.props)
    }
    loading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }
    loadVehicles = () => {
        API.getVehicles()
            .then(res =>
                this.setState({ vehicles: res.data, locname: "", poc: "", pocphone: "", vehicleinfo: "", spaces: "", comments: "", })
            )
            .catch(err => console.log(err));
    };
    // loadClaimIt = () => {
    //     API.claimIt()
    //         .then(res =>
    //             this.setState({ claimit: true })
    //         )
    //         .catch(err => console.log(err));
    // };
    vehicleUpload = () => {
        API.vehicleUpload()
            .then(res => this.setState({ spaces: res.data }))
            .catch(err => console.log(err));
    };
    handleInput = (event) => {
        var name = event.target.name
        var value = event.target.value
        if (name === "locname") {
            this.setState({ locname: value })
        } else if (name === "poc") {
            this.setState({ poc: value })
        } else if (name === "pocphone") {
            this.setState({ pocphone: value })
        } else if (name === "vehicleinfo") {
            this.setState({ vehicleinfo: value })
        } else if (name === "spaces") {
            this.setState({ spaces: value })
        } else if (name === "comments") {
            this.setState({ comments: value })
        }
    }
    handleUpload = (event) => {
        event.preventDefault()
        if (this.state.locname && this.state.poc && this.state.pocphone && this.state.vehicleinfo && this.state.spaces && this.state.comments) {
            API.saveVehicle({
                locname: this.state.locname,
                poc: this.state.poc,
                pocphone: this.state.pocphone,
                vehicleinfo: this.state.vehicleinfo,
                spaces: this.state.spaces,
                comments: this.state.comments,
            })
                .then(res => this.loadVehicles())
                .catch(err => console.log(err));
            window.location.reload();
        }
    }
    // handleClaimIt = (event) => {
    //     event.preventDefault()
    //     console.log("handleClaimIt")
    //     if (this.state.locname && this.state.poc && this.state.pocphone && this.state.vehicleinfo && this.state.spaces && this.state.comments) {
    //         console.log("in the if")
    //         API.claimIt({

    //             claimit: this.state.claimit
    //         })
    //             .then(res => this.loadVehicles())
    //             .catch(err => console.log(err));
    //         window.location.reload();
    //     }
    // }
    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox bgimg">
                
                        <h3 id="userTitle">Welcome {this.state.user.username}</h3>
                        <div>
                            <Row>
                                <Col lg-4>
                                    <h4 className="vehicletext">Add a new vehicle</h4>
                                    <Form>
                                        <FormGroup>
                                            <Label for="locname">Location Name</Label>
                                            <Input onChange={event => this.handleInput(event)} type="text" name="locname" id="locname" placeholder="Location Name" width="100" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="poc">Owner Name</Label>
                                            <Input type="text" name="poc" id="poc" placeholder="Owner Name" onChange={event => this.handleInput(event)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="pocphone">Phone #</Label>
                                            <Input type="text" name="pocphone" id="pocphone" placeholder="XXX-XXX-XXXX" onChange={event => this.handleInput(event)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="vehicleinfo">Vehicle Information</Label>
                                            <Input type="text" name="vehicleinfo" id="vehicleinfo" placeholder="Make-Model-Year-Color-Plate# etc." onChange={event => this.handleInput(event)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="spaces">Parking Space</Label>
                                            <Input type="text" name="spaces" id="spaces" placeholder="Enter the parking space number" onChange={event => this.handleInput(event)} />
                                        </FormGroup>
                                        {/* <FormGroup>
                                            <Label for="photo">Photo</Label>
                                            <Input type="text" name="photos" id="photos" placeholder="Photo" onChange={event => this.handleInput(event)} />
                                        </FormGroup> */}
                                        <FormGroup>
                                            <Label for="comments">Comments</Label>
                                            <Input type="text" name="comments" id="comments" placeholder="Comments..." onChange={event => this.handleInput(event)} />
                                        </FormGroup>
                                        <Button
                                            className="loginBtn btn btn-primary" disabled={!(this.state.locname && this.state.poc && this.state.pocphone && this.state.vehicleinfo && this.state.spaces && this.state.comments)}
                                            onClick={(event) => this.handleUpload(event)} color="primary">Submit
                                        </Button>
                                        <Button className="cancelBtn btn-danger mx-4">Cancel</Button>
                                    </Form>
                                    <br/><br/><br/>
                                </Col>
                                {/* <Col lg-8> */}
                                    <div>
                                        <h4 className= "claimtext">Retrieve a vehicle</h4>
                                        {this.state.vehicles.length ? (
                                            <div>
                                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Location</th>
                                                            <th>Name</th>
                                                            <th>Phone #</th>
                                                            <th>Vehicle Info</th>
                                                            <th>Space</th>
                                                            <th>Comments</th>
                                                            <th>Return</th>
                                                            <th>Update</th>
                                                        </tr>
                                                        {this.state.vehicles.map(vehicle => {
                                                            return (
                                                                <tr>

                                                                <td>{vehicle.locname}</td>
                                                                <td>{vehicle.poc}</td>
                                                                <td>{vehicle.pocphone}</td>
                                                                <td>{vehicle.vehicleinfo}</td>
                                                                <td>{vehicle.spaces}</td>
                                                                <td>{vehicle.comments}</td>
                                                                <td key={vehicle._id}><Timer/></td>
                                                                
                                                                
                
                                                                </tr>
 
                                                            )
                                                        })

                                                        }

                                                    </thead>
                                                </table>

                                            </div>
                                        ) : (
                                                <h3>No Results to Display</h3>
                                            )}
                                    </div>
                                {/* </Col> */}
                                <br/><br/><br/>  
                            </Row>
                        </div>
                    </div>
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
export default Vehicle;