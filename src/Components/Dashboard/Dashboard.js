import React from 'react'
import NearbyListing from './NearbyListing'
import MapContainer from './MapContainer'
import './dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <NearbyListing />
            <MapContainer />
        </div>

    )
}
export default Dashboard


