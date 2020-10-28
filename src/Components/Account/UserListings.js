import React, {Component} from 'react'
import { connect } from 'react-redux';
import {getUser} from '../../ducks/authReducer';
import axios from 'axios';
import MyListings from'./MyListings'

class UserListings extends Component{
    constructor(props){
        super(props)
        this.state = {
            mylistings: [],
            user_id: 0
        }
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
        await this.getMyListings()
        }

        componentDidUpdate(prevProps){
            if (this.props.user_id !== prevProps.user_id){
                this.props.getUser()
                }
            } 

        getMyListings = () => {
            const user_id = this.state.user_id
            axios.get(`/api/listing/mylistings/${user_id}`).then((res) => {
                this.setState({
                    mylistings: res.data
                })
            })
        }
    

    render(){
        const mappedList = this.state.mylistings.map((listing, index) => {
            return (
                <MyListings listing={listing} key={listing.id} push={this.props.history.push} />
            )
        })
        return (
        <div>
            <h1>
                My Listings
            </h1>
            <div>{mappedList}</div>
        </div>

    )}
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, {getUser})(UserListings)