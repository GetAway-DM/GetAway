import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUser} from '../../ducks/authReducer';
import axios from 'axios';

class Account extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            profile_img: '',
            emailEdit: false,
            nameEdit: false,
            profile_imgEdit: false,
            
        }
    }
    
    async componentDidMount(){
    if (!this.props.authReducer.isLoggedIn) {
        this.props.getUser().catch((err) => {
                this.props.history.push('/')
            }
        )
    }
    this.props.getUser().then(res => {
        this.setState({
            email: this.props.authReducer.user.email,
            first_name:this.props.authReducer.user.first_name,
            last_name: this.props.authReducer.user.last_name,
            profile_img: this.props.authReducer.user.profile_img
        })
    })
    }

    handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    }

    toggleEdit = (e) => {
        this.setState({
                [e.target.name]: !this.state.value
        })
    }
    toggleCancel = (e) => {
        this.setState({
            [e.target.name]: false,
        })
    }

    handleEdit = () => {
        const {email, first_name, last_name, profile_img} = this.state
        const {user_id} = this.props.authReducer.user
        axios.put('/api/user/edit', {user_id, email, first_name, last_name, profile_img}).then((res) => {
            this.props.getUser().then(res => {
                this.setState({
                    email: this.props.authReducer.user.email,
                    first_name:this.props.authReducer.user.first_name,
                    last_name: this.props.authReducer.user.last_name,
                    profile_img: this.props.authReducer.user.profile_img
                })
            })
        })
    }
    
    
      handleSubmit = (e) => {
        e.preventDefault()
        this.handleEdit()
        this.setState({
            emailEdit: false,
            nameEdit: false,
            profile_imgEdit: false,
        })
      }
    //test//

    render(props) {
        const {email, first_name, last_name, profile_img, user_id} = this.props.authReducer.user
        return (
            <div className="accountcontainer">
                <div >Account Details</div>
                <div className="infocontainer">
                    <p>Email: {email}</p>
                    <div className="email_edit">
                    { this.state.emailEdit === false ? <button name="emailEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button> :
                         <div>
                            <input value={this.state.email} onChange={(e) => {
                                this.handleInput(e)
                            }} name="email" placeholder="New Email"/><button name="emailEdit" onClick={(e)=> {this.toggleCancel(e)}}>Cancel</button>
                        </div>}
                    </div>
                    <p>Name: {first_name} {last_name}</p>
                    <div className="name_edit">
                    { this.state.nameEdit === false ? <button name="nameEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button> :
                         <div><input value={this.state.first_name} onChange={(e) => {
                            this.handleInput(e)
                        }} name="first_name" placeholder="First Name"/>  <input value={this.state.last_name} onChange={(e) => {
                            this.handleInput(e)
                        }} name="last_name" placeholder="Last Name"/><button name="nameEdit" onClick={(e)=> {this.toggleCancel(e)}}>Cancel</button></div> }
                    </div>
                    <p>Profile Picture: <img src={`${profile_img}`} alt="Not Loading"/></p>
                    <div className="profile_img_edit">
                        { this.state.profile_imgEdit === false ? <button name="profile_imgEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button> :  <div>
                            <input value={this.state.profile_img} onChange={(e) => {
                                this.handleInput(e)
                            }} name="profile_img" placeholder="New Profile Picture"/>
                            <button name="profile_imgEdit" onClick={(e)=> {this.toggleCancel(e)}}>Cancel</button>
                        </div> }
                    </div>
                    {this.state.emailEdit === true || this.state.nameEdit === true || this.state.profile_imgEdit === true ? <button onClick={(e) => {this.handleSubmit(e)} }>Submit Edit</button> : null}
                </div>
                <button onClick={(e) => {this.props.history.push('/createlisting')}}>Create A Listing</button>
                <button onClick={(e) => {this.props.history.push(`/reservations/${user_id}`)}}>My Reservations</button>
                <div> Reset Password Goes here!!!!</div>
                    <div>Listings, and Favorites will go here.</div>
            </div>
 
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, {getUser})(Account)