import Axios from 'axios'
import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'

function Reservation(props) {
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())

  console.log(props)

  const handleReservation = () => {
    if (dateTo === null || dateFrom === null) {
      console.log('please enter start and end dates')
    } else if (dateFrom > dateTo) {
      console.log('The starting date cannot be after the ending date')
    } else {
      const { user_id } = props.authReducer.user
      const { listing } = props
      Axios.post(`/api/reservation/newreservation/${listing}`, { user_id, listing, dateFrom, dateTo }).then((res) => {
        console.log(dateFrom)
        console.log(dateTo)
        props.history('/')
      })
    }
  }

  return (
    <div className="reserve-container">
      <div className="info-container">
        <p>{props.price}/night</p>
        <div>
          <p>star icon here</p>
          <p>avg rating here</p>
        </div>
      </div>
      <div className="selector-container">
        <div className="calendar-selector">
          <p>Check in</p>
          <Datepicker selected={dateFrom} dateFormat="yyyy-MM-dd" onChange={(date) => setDateFrom(date)} />
        </div>
        <div className="calendar-selector">
          <p>Check out</p>
          <Datepicker selected={dateTo} dateFormat="yyyy-MM-dd" onChange={(date) => setDateTo(date)} />
        </div>
      </div>
      <div className="guests-reserve">
        <div>
          <p>Guests</p>
          <input className="guest-type" placeholder="under construction"></input>
        </div>
        <button className="reserve-button" onClick={handleReservation}>
          Reserve
        </button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Reservation)