import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import './reservations.css'

class MyReservations extends Component {
    constructor(props) {
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
    async componentDidMount() {
        const { date_from, date_to, listing_id, res_id } = this.props.reservation
        await this.setState({
            res_id,
            date_from,
            date_to,
            listing_id
        })

        await axios.get(`/api/listing/getlisting/${listing_id}`).then((res) => {
            this.setState({
                listing: res.data
            })
        })
    }
    deleteReservation = () => {
        axios.delete(`/api/reservation/deletereservation/${this.state.res_id}`).then(window.location.reload())
    }

    render(props) {
        const { date_from, date_to, listing_id } = this.props.reservation
        return (
            <div className="res_container">
                <div className="res_dates">
                    <p>Date From: {date_from.slice(0, 10)}</p>
                    <p>Date To: {date_to.slice(0, 10)}</p>
                    <button onClick={(e) => { this.deleteReservation() }}>Delete Reservation</button>
                </div>
                <div className="res_details">
                    <p>{this.state.listing.title}</p>
                    <p>Address</p>
                    <p>{this.state.listing.street}</p>
                    <p>{this.state.listing.city}, {this.state.listing.state}</p>
                    <button onClick={(e) => { this.props.push(`/listing/${listing_id}`) }}>View Listing</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(MyReservations)
