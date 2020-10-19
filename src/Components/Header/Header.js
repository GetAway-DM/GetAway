import React, { Component } from 'react';

import { connect } from 'react-redux'
import axios from 'axios'
import { logoutUser, getUser } from '../../ducks/authReducer'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import * as ReactBootStrap from 'react-bootstrap'

class Header extends Component {

    handleLogout = async (e) => {
        await axios.post('/api/auth/logout')
            .then(() => {
                this.props.logoutUser()
                this.props.history.push("/")
            })
    }

    render() {
        return (
            <div className="App">
                <ReactBootStrap.Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <ReactBootStrap.Navbar.Brand href="#home">Get Away</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/features">
                                <ReactBootStrap.Nav.Link href="#features">Explore Nearby</ReactBootStrap.Nav.Link>
                            </Link>
                            <Link to="/pricing">
                                <ReactBootStrap.Nav.Link href="#pricing">About Us</ReactBootStrap.Nav.Link>
                            </Link>
                        </ReactBootStrap.Nav>

                        {
                            this.props.authReducer.isLoggedIn === true ?
                                <div>
                                    Signed in as : {this.props.authReducer.user.first_name} {this.props.authReducer.user.last_name}
                                </div>
                                :
                                null
                        }

                        <ReactBootStrap.NavDropdown title="Account" id="collasible-nav-dropdown">
                            <ReactBootStrap.NavDropdown.Item onClick={() => { this.props.history.push(`/account/${this.props.authReducer.user.user_id}`) }}>Profile</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="#action/3.2">Create Listing</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="#action/3.3">Favorites</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item> <Link to="/" onClick={() => { this.handleLogout() }}> Logout</Link></ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.Nav>
                            <Link to="/login">
                                <ReactBootStrap.Nav.Link href="#deets">Login</ReactBootStrap.Nav.Link>
                            </Link>
                            <Link to="/register">
                                <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
                                    Sign Up
              </ReactBootStrap.Nav.Link>
                            </Link>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>
            </div >
        );
    }
}

const mapStateToProps = (state) => state

export default withRouter(connect(mapStateToProps, { logoutUser, getUser })(Header))