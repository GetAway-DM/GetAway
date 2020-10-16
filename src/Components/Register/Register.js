import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { loginUser } from '../../ducks/authReducer'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirm_password: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleRegister = () => {
        const { email, first_name, last_name, password } = this.state
        axios
            .post('/register', { email, first_name, last_name, password })
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/login')
                if (this.state.password !== this.state.confirmPassword) {
                    message.error("The passwords doesn't match")
                    return false // The form won't submit
                }
                else return true; // The form will submit
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    handleUserChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleConfirmPassword = (e) => {
        if (e.target.value !== this.state.password) {
            message.error('error')
            this.setState({ confirmPassword: e.target.value })
        }
    }

    render() {
        return (
            <div className='Register'>
                <div className='register_container'>

                    <div className="register_input_container">

                        <p>First Name:</p>
                        <input
                            type="firstname"
                            maxLength="20"
                            placeholder="Enter First Name"
                            name="first_name"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />

                        <p>Last Name:</p>
                        <input
                            type="lastname"
                            maxLength="20"
                            placeholder="Enter Last Name"
                            name="last_name"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />

                        <p>Email:</p>
                        <input
                            maxLength="100"
                            placeholder="Enter Email"
                            name="email"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />

                        <p>Password:</p>
                        <input
                            type="password"
                            maxLength="20"
                            placeholder="Enter Password"
                            name="password"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />

                        <p>Confirm Password:</p>
                        <input
                            type="password"
                            maxLength="20"
                            placeholder="ConfirmPassword"
                            name="password"
                            onChange={(e) => {
                                this.handleInput(e)
                                this.handleConfirmPassword(e)
                            }}
                        />

                        <a className='button2' onClick={() => { this.handleRegister() }}> Submit </a>

                    </div>

                </div>

            </div>

        )
    }
}

export default connect(null, { loginUser })(Register)