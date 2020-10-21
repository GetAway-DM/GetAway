import React, { useEffect } from 'react'
import AddListings from './AddListings'
import Amenities from './Amenities'
import Reservation from './Reservation'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'
import axios from 'axios'

const Listings = (props) => {
  console.log(props)
  useEffect(() => {
    axios.get('/api/auth/me').then((res) => {
      props.getUser(res.data)
    })
  }, [])

  return (
    <div>
      <AddListings />
      <Reservation listing={props.match.params.listing_id} history={props.history.push} />
      <Amenities />
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUser })(Listings)
