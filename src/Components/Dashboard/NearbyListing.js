import React from 'react'
import CardListing from './CardListing'
import './dashboard.css'

function NearbyListing() {
    return (
      <div className="mapped-listing">
        <CardListing className="card-listing"/>
      </div>
    )
}

export default NearbyListing
