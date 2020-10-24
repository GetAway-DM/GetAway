import React, { Component } from 'react';

import { connect } from 'react-redux'
import axios from 'axios'
import { logoutUser, getUser } from '../../ducks/authReducer'
import { withRouter } from 'react-router-dom'
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
                    <ReactBootStrap.Navbar.Brand href="/">Get Away</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/dashboard">
                                <ReactBootStrap.Nav.Link href="/dashboard">Explore Nearby</ReactBootStrap.Nav.Link>
                            </Link>
                            <Link to="/aboutus">
                                <ReactBootStrap.Nav.Link href="/aboutus">About Us</ReactBootStrap.Nav.Link>
                            </Link>
                        </ReactBootStrap.Nav>

                        {
                            this.props.authReducer.isLoggedIn === true ?
                                <>
                                    <div>
                                        Signed in as : {this.props.authReducer.user.first_name} {this.props.authReducer.user.last_name}
                                    </div>
                                    <div>
                                        <ReactBootStrap.NavDropdown title="Account" id="collasible-nav-dropdown">
                                            <ReactBootStrap.NavDropdown.Item onClick={() => { this.props.history.push(`/account/${this.props.authReducer.user.user_id}`) }}>Profile</ReactBootStrap.NavDropdown.Item>
                                            <ReactBootStrap.NavDropdown.Item onClick={() => { this.props.history.push(`/reservations/${this.props.authReducer.user.user_id}`) }}>My Reservations</ReactBootStrap.NavDropdown.Item>

                                            <ReactBootStrap.NavDropdown.Divider />
                                            <ReactBootStrap.NavDropdown.Item href='/createlisting'>Create a Listing</ReactBootStrap.NavDropdown.Item>
                                            <ReactBootStrap.NavDropdown.Item href="#action/3.4">My Listings</ReactBootStrap.NavDropdown.Item>
                                            <ReactBootStrap.NavDropdown.Divider />

                                            <ReactBootStrap.NavDropdown.Item> <Link to="/" onClick={() => { this.handleLogout() }}>Logout</Link></ReactBootStrap.NavDropdown.Item>
                                        </ReactBootStrap.NavDropdown>
                                    </div>
                                </>
                                :
                                null
                        }

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