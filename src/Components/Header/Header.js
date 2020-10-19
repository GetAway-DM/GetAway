import React, { Component } from 'react';

import { connect } from 'react-redux'
import axios from 'axios'
import { logoutUser, getUser } from '../../ducks/authReducer'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import './Nav.css'
import * as ReactBootStrap from 'react-bootstrap'

import logout from './logout.png'
import login from './login.png'

class Header extends Component {

    handleLogout = (e) => {
        axios.post('/api/auth/logout')
            .then(() => {
                this.props.logoutUser()
                this.props.history.push("/")
            })
    }

    render() {
        return (
            // <div className="Nav">
            //     <div>
            //         Get Away
            //     </div>
            //     <div>
            //         {
            //             this.props.isLoggedIn === true ?
            //                 <div>
            //                     <Link to="/">Home</Link>
            //                     Signed in as: {this.props.user.first_name} {this.props.user.last_name}
            //                     <button onClick={this.handleLogout}> <img src={logout} />Logout</button>
            //                 </div>
            //                 :
            //                 <div>
            //                     <Link to="/">Home</Link>
            //                     <Link to="/login"> <img src={login} />Sign in</Link>
            //                     <Link to="/register">Sign up</Link>
            //                 </div>

            //         }
            //     </div>
            // </div>
            <div className="App">
                <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
                    <ReactBootStrap.Navbar.Brand href="#home">Get Away</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/features">
                                <ReactBootStrap.Nav.Link href="#features">Features</ReactBootStrap.Nav.Link>
                            </Link>
                            <Link to="/pricing">
                                <ReactBootStrap.Nav.Link href="#pricing">Pricing</ReactBootStrap.Nav.Link>
                            </Link>
                            <ReactBootStrap.NavDropdown title="YEET" id="collasible-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Divider />
                                <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
                            </ReactBootStrap.NavDropdown>
                        </ReactBootStrap.Nav>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => state

export default withRouter(connect(mapStateToProps, { logoutUser, getUser })(Header))