import React, { Component } from "react";
import { Jumbotron, Container, } from 'reactstrap';
import Wrapper from "./Wrapper";
import "./TopNav.scss";
import API from "../../utils/API";
import logo from "./logo1.png";
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }
    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    logout() {
        API.logout().then((data) => {
            window.location.pathname = "/"
        }).catch((err) => {
            console.log(err)
        })
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="navbar bg-dark text-center" light expand="md">
                    {/* <NavbarBrand href="/" className="titleFont"> EZValet</NavbarBrand> */}
                    <div className="sck">
                        <img src={logo} width="75" height="50"/> EZ Valpark 
                    </div>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i className="fas fa-home text-white"></i></NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className="fas fa-user text-white"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.loggedIn ? (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/profile">Profile</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink onClick={this.logout}>Logout</NavLink>
                                            </DropdownItem>
                                        </>
                                    ) : (
                                            <>
                                                <DropdownItem>
                                                    <NavLink href="/login">login</NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavLink href="/signup">signup</NavLink>
                                                </DropdownItem>
                                            </>
                                        )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Wrapper>
                        <div className="border border-dark rounded">
                        <img width="80%" height="80%" src="assets/images/ez-valpark2.png" className="img-fluid rounded mx-auto d-block" alt="Responsive image"/>
                        <h5 className="bg-success text-center text-white mx-2 p-2">Fully Ticketless Valet Solution</h5> 
                        </div>    
                </Wrapper>
            </div>
        );
    }
}