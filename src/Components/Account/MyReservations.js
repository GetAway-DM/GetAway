import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
class MyReservations extends Component{
    constructor(props){
        super(props)
        this.state = {
            res_id: 0,
            date_from: '',
            date_to: '',
            dfrom: '',
            dto: '',
            listing_id: 0,
            listing: {}
        }
    }
    async componentDidMount(){
        const { date_from, date_to, listing_id, res_id} = this.props.reservation
        await this.setState({
            res_id,
            date_from,
            date_to,
            listing_id
        })
        const dfrom = this.getDate(date_from)
        console.log(dfrom)
        
        await axios.get(`/api/listing/getlisting/${listing_id}`).then((res) => {
            this.setState({
                listing: res.data
            })
        })
    }
    deleteReservation = () => {
        axios.delete(`/api/reservation/deletereservation/${this.state.res_id}`).then(window.location.reload())
    }

    render(props){
        const { date_from, date_to, listing_id} = this.props.reservation
        //works//
        return (
        <div>
            <div>
                <p>Date From: {date_from}</p>
                <p>Date To: {date_to}</p>
            <button onClick={(e) => {this.deleteReservation()}}>Delete Reservation</button>
            </div>
            <div>
            <p>{this.state.listing.title}</p>
            <p>Address:</p>
            <p>{this.state.listing.street}</p>
            <p>{this.state.listing.city}, {this.state.listing.state}</p>
            <button onClick={(e) => {this.props.push(`/listing/${listing_id}`)}}>View Listing</button>
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(MyReservations)
