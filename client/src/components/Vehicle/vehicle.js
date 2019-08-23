import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Vehicle.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import moment from 'moment'

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
        comments: null,
        qrData: null,
        rate: null,
        total:null
    }
    componentDidMount() {
        this.loading();
        this.loadVehicles();
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
                this.setState({ vehicles: res.data, customerId: "", locname: "", poc: "", pocphone: "", vehicleinfo: "", spaces: "", rate: "", total: "", comments: "", })                
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
        const randomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
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
        } else if (name === "rate") {
            this.setState({rate: value})
            // if(this.rate === "$5"){
            //   this.setState({total: this.rate * 3})
            // }
            
        }
        this.setState({total: this.state.rate * 3});
        this.setState({customerId: "EZ-" + this.state.pocphone.substring(this.state.pocphone.length-2) + randomNumber});
    }
    handleUpload = (event) => {
        // alert("Saving");
        let { customerId, locname, poc, pocphone, vehicleinfo } = this.state;
        let qrData = { customerId, locname, poc, pocphone, vehicleinfo }
        let qrStrData = customerId + " | " + locname + " | " + poc + " | " + pocphone + " | " + vehicleinfo;
        this.setState({
            vehicles: [], qrData
        })
        event.preventDefault()
        if (this.state.customerId && this.state.locname && this.state.poc && this.state.pocphone && this.state.vehicleinfo && this.state.spaces && this.state.rate && this.state.total && this.state.comments) {
            API.saveVehicle({
                customerId: this.state.customerId,
                locname: this.state.locname,
                poc: this.state.poc,
                pocphone: this.state.pocphone,
                vehicleinfo: this.state.vehicleinfo,
                spaces: this.state.spaces,
                comments: this.state.comments,
                mediaUrl: 'https://chart.googleapis.com/chart?chs=350x350&cht=qr&chl=' + encodeURIComponent(qrStrData) + '&choe=UTF-8',
                rate: this.state.rate,
                total: this.state.total,
                //createdAt: this.state.createdAt
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

    myFunction = () =>  {
        // Declare variables 
        var input, filter, table, tr, td, i, txtValue;
        //var index=1;
        var index= document.getElementById("dropdown_change").value;
        console.log("index");
        document.getElementById('dropdown_change').onchange = function() {
            index=this.options[this.selectedIndex].value;
            document.getElementById('myInput').value = '';
            //window.location.reload();
        }

        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[index];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          } 
        }
      };
    
    render() {
        return (
            <div className="dashboardPage">
                {this.state.loggedIn ? (
                    <div className="dashboardBox bgimg">
                
                        <h3 className="aqua-gradient text-white p-2" id="userTitle">Welcome {this.state.user.firstname}</h3>
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
                                        <FormGroup>
                                            <label for="rate">Select Parking Rate:</label>
                                            <select class="browser-default custom-select" name="rate" value={this.state.value} onChange={event => this.handleInput(event)}>
                                                <option selected>Options</option>
                                                <option value="5">By Hour ($5)</option>
                                                <option value="25">By Day ($25)</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="comments">Comments</Label>
                                            <Input type="text" name="comments" id="comments" placeholder="Comments..." onChange={event => this.handleInput(event)} />
                                        </FormGroup>
                                        <Button
                                            className="loginBtn btn btn-primary" disabled={!(this.state.customerId && this.state.locname && this.state.poc && this.state.pocphone && this.state.vehicleinfo && this.state.spaces && this.state.rate && this.state.comments)}
                                            onClick={(event) => this.handleUpload(event)} color="primary">Submit
                                        </Button>
                                        <button type="reset" className="cancelBtn btn btn-danger ">Cancel</button>
                                    </Form>
                                    <br/><br/><br/>
                                </Col>
                                {/* <Col lg-8> */}
                                    <div>
                                        <h2 className= "parkedVehicle mx-2">Parked Vehicles</h2>
                                        <div>
                                        <FormGroup className="form-inline">
                                        <div className="form-group mr-2">
                                        <label for="find by" className=" font-weight-bold mx-2">Find by:</label>
                                        <select id="dropdown_change" className="custom-select form-group col-md-8 mx-2" name="selectBy">
                                                <option value="1" selected>Cust_ID</option>
                                                <option value="3" >Name</option>
                                                <option value="4" >Phone</option>
                                                <option value="5" >Registration</option>
                                        </select>
                                        </div>
                                        <div className="form-group my-2 ">
                                            <input type="text" class="form-control" id="myInput" onKeyUp={() => this.myFunction()} placeholder="Value"/>
                                        </div>  
                                        <button onClick={() => window.location.reload()} type="button" class="btn btn-primary"><i class="fas fa-redo m-2"></i></button>                                
                                        </FormGroup>
                                        </div>

                                        {this.state.vehicles.length ? (
                                            <div className="table-responsive-md">
                                                <table id="myTable" className="table table-bordered w-auto table-sm tempting-azure-gradient" cellspacing="0" width="100%" style={{ marginTop: 20 }}>
                                                    <thead className="text-center">
                                                        <tr className="header">
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
                                                            <th scope="col">Total</th>
                                                            <th scope="col">Update</th>                                                           
                                                            <th scope="col">Return</th>   
                                                        </tr>
                                                        {this.state.vehicles.map((vehicle, index) => {
                                                            return (
                                                                
                                                                <tr>
                                                                <td className="counterCell">{""+"."}</td>
                                                                {/* <td>{vehicle._id}</td> */}
                                                                <td>{vehicle.customerId}</td>
                                                                <td>{vehicle.locname}</td>
                                                                <td>{vehicle.poc}</td>
                                                                <td>{vehicle.pocphone}</td>
                                                                <td>{vehicle.vehicleinfo}</td>
                                                                <td> <textarea className = "spaceClass" style={{maxWidth:"50px"}} onChange={e => this.updateTableField(index, "spaces", e)} value={vehicle.spaces}/></td>
                                                                <td>{moment(vehicle.createdAt).format("MM-DD-YYYY hh:mm A")}</td>
                                                                <td><textarea className = "spaceClass" style={{maxWidth:"100px"}}  onChange={e => this.updateTableField(index, "comments", e)} value={vehicle.comments}/></td>
                                                                <td>{"$"+ vehicle.rate + "/hour"}</td>
                                                                <td>{vehicle.total}</td>
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
                                    <h4>Please login to continue...</h4>
                                    <Link className="loginLink" to="/login"><Button className="loginBtn"  block>Login</Button></Link>
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