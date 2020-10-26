import React, {Component} from 'react'
import { connect } from 'react-redux';
import {getUser} from '../../ducks/authReducer';
import axios from 'axios';

class UserListings extends Component{
    constructor(props){
        super(props)
    }

    async componentDidMount(){
        if (!this.props.authReducer.isLoggedIn) {
            this.props.getUser().catch((err) => {
                    this.props.history.push('/')
                }
            )
        }
        await this.props.getUser().then(res => {
            this.setState({
                user_id: this.props.authReducer.user.user_id
            })
        })
        // await this.getMyListings()
        }
    

    render(){
        return (
        <div>
            <h1>
                My Listings
            </h1>

        </div>

    )}
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, {getUser})(UserListings)