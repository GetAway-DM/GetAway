import React, { Component } from 'react';

import { connect } from 'react-redux'
import axios from 'axios'
import { logoutUser, getUser } from '../../ducks/authReducer'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class Nav extends Component {

    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            await this.props.getUser()
            if (!this.props.isLoggedIn) {
                this.setState({
                    isLoggedIn: false
                })
            } else if (this.props.isLoggedIn) {
                this.setState({
                    isLoggedIn: true,
                })
            }
        }
    }

    handleLogout = (e) => {
        axios.post('/api/auth/logout')
            .then(() => {
                this.props.logoutUser()
                this.props.history.push("/")
            })
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    Get Away
                </div>
                <div>
                    {
                        this.state.isLoggedIn === true ?
                            <div>
                                <Link to="/">Home</Link>
                                {/* <Link to="/login">Sign in</Link>
                            <Link to="/register">Sign up</Link> */}
                                <button onClick={this.handleLogout()}>Logout</button>
                                Signed in as: {this.props.user.first_name} {this.props.user.last_name}
                            </div>
                            :
                            <div>
                                <Link to="/">Home</Link>
                                <Link to="/login">Sign in</Link>
                                <Link to="/register">Sign up</Link>
                            </div>
                    }
                </div>
            </div>

        );

    }
}

const mapStateToProps = (state) => state

export default withRouter(connect(mapStateToProps, { logoutUser, getUser })(Nav))