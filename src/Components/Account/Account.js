import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUser} from '../../ducks/authReducer';

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
    if (!this.props.isLoggedIn) {
        this.props.getUser().catch((err) => {
                this.props.history.push('/')
            }
        )
    }
    this.props.getUser()
    }

    componentDidUpdate(prevProps){
    if (this.props.userid !== prevProps.userid){
        this.props.getUser()
        }
    }

    handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    }

    toggleEdit = (e) => {
        this.setState({
                [e.target.name]: !e.target.value
        })
    }

    render(props) {
        const {email, first_name, last_name, profile_img} = this.props.user
        return (
            <div className="accountcontainer">
                <div >Account Details</div>
                <div className="infocontainer">
                    <p>Email: {email}</p>
                    <div className="email_edit">
                        <button name="emailEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button>
                        { this.state.emailEdit === true ? <input onChange={(e) => {
                            this.handleInput(e)
                        }} name="email" placeholder="New Email"/> : null}
                    </div>
                    <p>Name: {first_name} {last_name}</p>
                    <div className="name_edit">
                        <button name="nameEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button>
                        { this.state.nameEdit === true ? <div><input onChange={(e) => {
                            this.handleInput(e)
                        }} name="first_name" placeholder="First Name"/>  <input onChange={(e) => {
                            this.handleInput(e)
                        }} name="last_name" placeholder="Last Name"/></div> : null}
                    </div>
                    <p>Profile Picture: {profile_img}</p>
                    <div className="profile_img_edit">
                        <button name="profile_imgEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button>
                        { this.state.profile_imgEdit === true ? <input onChange={(e) => {
                            this.handleInput(e)
                        }} name="profile_img" placeholder="New Profile Picture"/> : null}
                    </div>
                </div>
                <div> Reset Password Goes here!!!!</div>
                    <div>Reservations and Favorites will go here.</div>
            </div>

            //link to create listing at bottom or top? 
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, {getUser})(Account)