import React, {Component} from 'react'
import { connect } from 'react-redux';
import {getUser} from '../../ducks/authReducer';
import axios from 'axios';
class UserReservations extends Component {
    constructor(props){
        super(props)
        this.state = {
            reservations: [],
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
        await this.getReservations()
        }
    
        componentDidUpdate(prevProps){
        if (this.props.user_id !== prevProps.user_id){
            this.props.getUser()
            }
        }

        getReservations = () => {
            const user_id = this.state.user_id
            axios.get(`/api/reservations/${user_id}`).then((res) => {
                this.setState({
                    reservations: res.data
                })
            })
        }


    render(){

        return (
            <div>
                <h1>My Reservations</h1>
            </div>
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, {getUser})(UserReservations)
