import React, {Component} from 'react'
import { connect } from 'react-redux';
class MyReservations extends Component{
    constructor(props){
        super(props)
    }
    render(props){
        const { date_from, date_to, listing_id} = this.props.reservation
        //works//
        return (
        <div>
            <div>
                <p>Date From: {date_from}</p>
                <p>Date To: {date_to}</p>
            </div>
            <div>
            <button onClick={(e) => {this.props.push(`/listing/${listing_id}`)}}>View Listing</button>
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(MyReservations)
