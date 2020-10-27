import React from 'react'
import NearbyListing from './NearbyListing'
import MapContainer from './MapContainer'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard-body">
      <NearbyListing className="listing-box"/>
      <MapContainer className="map-box"/>
    </div>
  )
}
export default Dashboard
