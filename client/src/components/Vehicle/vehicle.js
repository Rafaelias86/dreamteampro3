import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Vehicle.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
//import { Table } from 'reactstrap';
import moment from 'moment'
import { resolve } from "url";

class Vehicle extends Component {
    state = {
        loggedIn: false,
        user: null,
        customerId: "",
        loading: true,
        vehicles: [],
        locname: "",
        poc: "",
        pocphone: "",
        vehicleinfo: "",
        spaces: "",
        comments: ""
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
        //console.log(this.props)
    }
    loading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }
    loadVehicles = () => {
        return new Promise((resolve,reject) => {
        API.getVehicles()
            .then(res => {
                this.setState({ vehicles: res.data, locname: "", poc: "", pocphone: "", vehicleinfo: "", spaces: "", comments: "", })
                resolve();
            }
            )
            .catch(err => {
                console.log(err);
                reject(err);
            } );
        });
    };

    vehicleUpload = () => {
        return new Promise((resolve,reject)=>{
            API.vehicleUpload()
            .then(res => {
                this.setState({ spaces: res.data });
                resolve();
            })
            .catch(err => console.log(err));
        })
       
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
                customerId: this.state.customerId,
                locname: this.state.locname,
                poc: this.state.poc,
                pocphone: this.state.pocphone,
                vehicleinfo: this.state.vehicleinfo,
                spaces: this.state.spaces,
                comments: this.state.comments,
            })
                .then(res => {
                    this.loadVehicles()
                    .then(() => window.location.reload());
                })
                .catch(err => console.log(err));
        }
    }

    handleDeleteVehicle = id => {
        //console.log("deleting");
        API.deleteVehicles(id)
          .then(res => this.loadVehicles())
          .catch(err => console.log(err));
          window.location.reload();
      };

    handleUpdateVehicle = (id, index) => {
    console.log("updating");
    const vehicle = this.state.vehicles[index];
    API.updateVehicles(id, vehicle)
        .then(res => {
            this.loadVehicles()
            .then(() => window.location.reload())
            .catch(e => console.error(e));
        })
        .catch(err => console.log(err));
        
    };

    updateTableField = (index, property, e) => {
        console.log("at updateTableField")
        console.log(index, property, e)
        let vehicles = this.state.vehicles;
        e.target.style.height = (e.target.scrollHeight) + "px";
        vehicles[index][property] = e.target.value; 
        this.setState({vehicles: vehicles})
    };
    
    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox bgimg">
                
                        <h3 className="bg-dark text-white p-2" id="userTitle">Welcome {this.state.user.firstname}</h3>
                        <div>
                            <Row>
                                <Col className="lg-4">
                                    <h2 className="vehicletext">Add a new vehicle</h2>
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
                                        <h2 className= "parkedVehicle mx-2">Parked Vehicle</h2>
                                        {this.state.vehicles.length ? (
                                            <div className="table-responsive">
                                                <table className="table table-bordered w-auto" style={{ marginTop: 20 }}>
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            {/* <th>ID</th> */}
                                                            <th scope="col">#</th>
                                                            <th scope="col">Cust_ID</th>
                                                            <th scope="col">Location</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Phone</th>
                                                            <th scope="col">Vehicle_Info</th>
                                                            <th scope="col">Space</th>
                                                            <th scope="col">Parked_At</th>
                                                            <th scope="col">Comments</th>
                                                            <th scope="col">Rate</th>
                                                            <th scope="col">Update</th>                                                           
                                                            <th scope="col">Return</th>
                                                            
                                                        </tr>
                                                        {this.state.vehicles.map((vehicle, index) => {
                                                            const customerId = "EZ-" + vehicle.pocphone.substring(vehicle.pocphone.length-2).concat(vehicle._id.substring(vehicle._id.length-4));
                                                            return (
                                                                
                                                                <tr>
                                                                <td className="counterCell">{""+"."}</td>
                                                                {/* <td>{vehicle._id}</td> */}
                                                                <td>{customerId}</td>
                                                                <td>{vehicle.locname}</td>
                                                                <td>{vehicle.poc}</td>
                                                                <td>{vehicle.pocphone}</td>
                                                                <td>{vehicle.vehicleinfo}</td>
                                                                <td> <textarea className = "spaceClass" style={{maxWidth:"50px"}} onChange={e => this.updateTableField(index, "spaces", e)} value={vehicle.spaces}/></td>
                                                                <td>{moment(vehicle.createdAt).format("MM-DD-YYYY hh:mm A")}</td>
                                                                <td><textarea className = "spaceClass" style={{maxWidth:"100px"}}  onChange={e => this.updateTableField(index, "comments", e)} value={vehicle.comments}/></td>
                                                                <td>$10/Day</td>  
                                                                <td>
                                                                    <button
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                    name="Update"
                                                                    key={vehicle._id}
                                                                    onClick={() => this.handleUpdateVehicle(vehicle._id, index)}                                                                    
                                                                    >
                                                                    Update
                                                                    </button>
                                                                </td>  
                                                                <td>
                                                                    <button 
                                                                        className="btn btn-danger"
                                                                        type="button"
                                                                        name="Delete"
                                                                        key={vehicle._id}
                                                                        onClick={() => this.handleDeleteVehicle(vehicle._id)}                                                                       
                                                                    >
                                                                    Return
                                                                    </button>
                                                                </td>          
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
                                    <Link className="loginLink" to="/login"><Button onclick="generateTicket()" className="loginBtn" color=".bg-success" block>Login</Button></Link>
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