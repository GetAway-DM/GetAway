import React, {Component} from 'react'

class MyReservations extends Component{
    render(props){
        console.log(this.props.reservation.date_from)//works//
        return (
        <div>
            <h1>reservations</h1>
        </div>
        )
    }
}

export default MyReservations
