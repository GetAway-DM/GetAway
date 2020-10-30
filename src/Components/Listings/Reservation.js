import axios from 'axios'
import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import StarRatingComponent from 'react-star-rating-component'
import Divider from '@material-ui/core/Divider'
import './reservation.css'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Button from '@material-ui/core/Button'
import { createMuiTheme } from '@material-ui/core/styles'

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
      axios
        .post(`/api/reservation/newreservation/${listing}`, {
          user_id,
          listing,
          dateFrom,
          dateTo,
        })
        .then((res) => {
          props.history(`/reservations/${user_id}`)
        })
    }
  }

  const theme = createMuiTheme({
    palette: {
      primary: blueGrey,
    },
  })

  return (
    <div className="reserve-container" style={{ paddingTop: '7rem' }}>
      <div className="info-container">
        <p>
          <strong>${props.listReducer.listing.price}</strong> /night
        </p>
        <div className="avg-container">
          <p>
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={1}
              value={1}
              starDimension={'15px'}
            />
            <span>{props.listReducer.listing.avg}</span>
          </p>
        </div>
      </div>
      <div className="selector-container">
        <div className="calendar-selector">
          <p>Check in</p>
          <Datepicker
            selected={dateFrom}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setDateFrom(date)}
          />
        </div>
        <div className="calendar-selector">
          <p>Check out</p>
          <Datepicker
            selected={dateTo}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setDateTo(date)}
          />
        </div>
      </div>
      <div className="guests-reserve">
        {/* <button className="reserve-button" onClick={handleReservation}>
          Reserve
        </button> */}
        <Button
          onClick={handleReservation}
          size="medium"
          // position="relative"
          variant="contained"
          color="primary">
          Reserve
        </Button>
      </div>
      <div>
        <Divider orientation="vertical" flexItem />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Reservation)
