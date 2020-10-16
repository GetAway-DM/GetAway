import React, { Component } from 'react';
import { loginUser } from '../../ducks/authReducer'
import {connect} from 'react-redux'
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleLogin = () => {
        const {email, password } = this.state
        axios.post('/api/auth/login', {email, password}).then((res) => {
            this.props.loginUser(res.data)
            this.props.history.push('/')
        }).catch((err) => {
            alert(err.message)
        })
    }

    render() {
        return (
            <div className="loginpage">
                <div className="logincontainer">
                    <div className="logininputs">
                        <input placeholder="Enter Email" name="email" onChange={(e) => { this.handleInput(e)}} />
                        <input placeholder="Enter Password" name="password" type="password" onChange={(e) => { this.handleInput(e)}} />
                    </div>
                    <button onClick={() => {this.handleLogin()}} className="login-button">Login</button>
                    <button onClick={()=> {this.props.history.push('/')}}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Login);