import Axios from 'axios'
import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import { connect } from 'react-redux'

function Reservation(props) {
  console.log(props)
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())

  const handleReservation = () => {
    const { user_id } = props
    const { listing_id } = props.match.params
    Axios.post(`/api/reservation/newreservation/${listing_id}`, { user_id, listing_id, dateFrom, dateTo }).then(
      (res) => {
        res.history.push('/')
      }
    )
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
          <Datepicker selected={dateFrom} onChange={(date) => setDateFrom(date)} />
        </div>
        <div className="calendar-selector">
          <p>Check out</p>
          <Datepicker selected={dateTo} onChange={(date) => setDateTo(date)} />
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
