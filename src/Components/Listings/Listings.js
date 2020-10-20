import React from 'react'
import AddListings from './AddListings'
import Amenities from './Amenities'
import Reservation from './Reservation'

const Listings = () => {
  return (
    <div>
      <AddListings />
      <Reservation />
      <Amenities />
    </div>
  )
}

export default Listings
