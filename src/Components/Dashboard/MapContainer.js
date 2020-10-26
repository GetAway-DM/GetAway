import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import Request from './Request'
import './dashboard.css'

const points = [
  { id: 1, title: 'Round Pond', lat: 51.506, lng: -0.184 },
  { id: 2, title: 'The Long Water', lat: 51.508, lng: -0.175 },
  { id: 3, title: 'The Serpentine', lat: 51.505, lng: -0.164 },
]

export default function MapContainer() {
  return (
    <div className="mapContainer">
      <Request />
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyAidj2vQaxHLAtybTybhIAZi6bnUm7fGkE',
          language: 'en',
          region: 'US',
        }}
        defaultCenter={{ lat: 38.8816, lng: -104.72396 }}
        defaultZoom={15}>
        {points.map(({ lat, lng, id, title }) => {
          return (
            <Marker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}
